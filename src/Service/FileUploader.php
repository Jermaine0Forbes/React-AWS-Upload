<?php
namespace App\Service;

use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\HttpFoundation\Request;
use Psr\Log\LoggerInterface;
use App\DTO\UploadDTO;


class FileUploader
{
    public function __construct(
        private string $targetDirectory,
        private SluggerInterface $slugger,
        private LoggerInterface $logger
    ) {
    }

    public function checkFiles(Request $request): UploadDTO {
            $files = $request->files->all() ?? [];

        $metadata = array_map(function ($val) {
            if (is_string($val)) {
                return json_decode($val, true);
            } else {
                return $val;
            }
        }, $request->request->all()) ?? [];


        $dto = new UploadDTO();
        try {
            $dto->files = is_array($files) ? $files : [$files];
            $dto->metadata = $metadata;
            if( empty($dto->files)) {
                $this->logger->error('No files found in the upload request.');
                throw new \Exception('No files found in the upload request.');
            }
            if( empty($dto->metadata)) {
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

                try {
                    $file->move($this->targetDirectory, $newFilename);
                    $this->logger->info('file moved to: ' . $this->targetDirectory . '/' . $newFilename);
                    $success = true;
                } catch (FileException $e) {
                    $this->logger->error('Error processing upload data: ' . $e->getMessage());
                }
            } else {
                $this->logger->warning('Invalid file upload detected.');
            }
        }

        return $success ;
    }

    public function getTargetDirectory(): string
    {
        return $this->targetDirectory;
    }
}