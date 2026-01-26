<?php

namespace App\Service;

use App\Entity\Content;
use App\Entity\User;
use App\Entity\SubscriptionLimit;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\HttpFoundation\Request;
use Psr\Log\LoggerInterface;
use App\DTO\UploadDTO;
use Symfony\Component\Filesystem\Filesystem;


class FileUploader
{
    private int $user_id;
    private SubscriptionLimit $subLimit;
    private User $user;

    public function __construct(
        private string $targetDirectory,
        private S3 $s3,
        private SluggerInterface $slugger,
        private LoggerInterface $logger,
        private EntityManagerInterface $entityManager,
        private FileSystem $fs
    ) {}

    public function checkFiles(Request $request): UploadDTO
    {
        $userId = intval($request->attributes->get('id'));

        if (!is_int($userId) || $userId <= 0) {
            $this->logger->error('Invalid user ID in upload request.');
            throw new \Exception('Invalid user ID in upload request.');
        }

        $this->setUserId($userId);
        $user = $this->entityManager->getRepository(User::class)->findOneById($userId);

        if (!$user) {
            $this->logger->error('User not found for ID: ' . $userId);
            throw new \Exception('User not found for ID: ' . $userId);
        }
        $this->setUser($user);



        $files = $request->files->all() ?? [];

        $metadata = array_map(function ($val) {
            if (is_string($val)) {
                return json_decode($val, true);
            } else {
                return $val;
            }
        }, $request->request->all()) ?? [];

        $subLimit = $user->getSubscriptionLimit();
        $currentDate = new \DateTime();
        if ($subLimit->getExpirationDate() < $currentDate) {
            $subLimit->setCurrent(0);
            $subLimit->setExpirationDate(($currentDate)->modify('+30 days'));
            $this->entityManager->persist($subLimit);
            $this->entityManager->flush();
        }

        if (!$subLimit || (count($files) + $subLimit->getCurrent()) > $subLimit->getMax()) {
            $this->logger->error('Upload limit exceeded for user ID: ' . $userId);
            throw new \Exception('Upload limit exceeded. Max allowed: ' . $subLimit->getMax());
        }

        $dto = new UploadDTO();
        try {
            $dto->files = is_array($files) ? $files : [$files];
            $dto->metadata = $metadata;
            $this->subLimit = $subLimit;
            if (empty($dto->files)) {
                $this->logger->error('No files found in the upload request.');
                throw new \Exception('No files found in the upload request.');
            }
            if (empty($dto->metadata)) {
                $this->logger->error('No metadata found in the upload request.');
                throw new \Exception('No metadata found in the upload request.');
            }
        } catch (\Exception $e) {
            $this->logger->error('Error processing upload data: ' . $e->getMessage());
        }

        return $dto;
    }

    public function upload(UploadDTO $dto): bool
    {
        $success = false;
        for ($i = 0; $i  < count($dto->files); $i++) {
            $file = $dto->files["file-" . $i] ?? null;
            $meta = array_values($dto->metadata["metadata-" . $i]) ?? [];
            $filename = $meta[0] ?? '';
            $description = $meta[1] ?? '';

            if ($file instanceof UploadedFile) {
                $this->logger->info('Received file: ' . $file->getClientOriginalName());
                $originalFilename = pathinfo($filename, PATHINFO_FILENAME);
                $safeFilename = $this->slugger->slug($originalFilename);
                $newFilename = $safeFilename . '-' . uniqid() . '.' . $file->guessExtension();
                $type = $file->getMimeType();

                $connection = $this->entityManager->getConnection();
                try {
                    $connection->beginTransaction();

                    // Move the file to the target directory
                    $file->move($this->targetDirectory, $newFilename);
                    $subLimit = $this->subLimit;
                    $sourceFile = $this->targetDirectory . '/' . $newFilename;
                    $key = $this->getuser()->getUsername().'/'.$originalFilename;
                    $this->logger->info('file moved to: ' . $sourceFile);
                    $objectUrl = $this->s3->upload([
                        "Key" => $key,
                         "ContentType" => $type,
                         "SourceFile" => $sourceFile,
                         "Metadata" => [
                            "tier" => $subLimit->getTier(),
                            "description" => $description,
                            "expiration_date" => $subLimit->getExpirationDate()->format('Y-m-d H:i:s') 
                         ]
                    ]);

                    if($objectUrl) {
                        $this->fs->remove($sourceFile);
                    }

                    // Save file info to the database
                    $content = new Content();
                    $content->setPath($key);
                    $content->setName($originalFilename);
                    $content->setDescription($description);
                    $content->setUser($this->getUser());

                    
                    $subLimit->incrementCurrent();
                    $subLimit->setUpdatedAt();
                    $subLimit->setUserId($this->getUserId());
                    
                    //exectute DB operations
                    $this->entityManager->persist($subLimit);
                    $this->entityManager->persist($content);
                    $this->entityManager->flush();

                    $connection->commit();
                    $success = true;
                } catch (FileException $e) {
                    $connection->rollBack();
                    $this->logger->error('Error processing upload data: ' . $e->getMessage());
                }
            } else {
                $this->logger->warning('Invalid file upload detected.');
                return $success;
            }
        }

        return $success;
    }

    public function getTargetDirectory(): string
    {
        return $this->targetDirectory;
    }

    public function getUserId(): int
    {
        return $this->user_id;
    }

    public function setUserId(int $userId): void
    {
        $this->user_id = $userId;
    }

    protected function getUser():?User 
    {
        return $this->user;
    }

    protected function setUser(User $user)
    {
        $this->user = $user;
    }
}
