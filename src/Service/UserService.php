<?php

namespace App\Service;

use App\Entity\User;
use Symfony\Component\HttpFoundation\Request;
use Psr\Log\LoggerInterface;
use Doctrine\ORM\EntityManagerInterface;

final class UserService
{

    private ?User $user;

    public function __construct(
        private LoggerInterface $logger,
        private EntityManagerInterface $entityManager,
        private S3 $s3,
    ) {}

    private function checkUser(int $id)
    {
        if (!is_int($id) || $id <= 0) {
            $this->logger->error('Invalid user ID in upload request.');
            throw new \Exception('Invalid user ID in upload request.');
        }

        $user = $this->entityManager->getRepository(User::class)->findOneById($id);

        if (!$user) {
            $this->logger->error('User not found for ID: ' . $id);
            throw new \Exception('User not found for ID: ' . $id);
        }
        
        $this->setUser($user);
    }

    protected function getUser(): ?User
    {
        return $this->user;
    }

    protected function setUser(User $user)
    {
        $this->user = $user;
    }

    public function retrieveContent(Request $request):array
    {
        $id = intval($request->attributes->get('id'));
        $this->checkUser($id);
        $user = $this->getUser();
        $content = [];
        $collection = array_reverse($user->getContents()->toArray());

        foreach( $collection as $key => $item) {
            $url = $this->s3->retrieve($item->getPath());
            $content[] = [
                "path" => $url,
                "id" => $item->getId(),
                "name" => $item->getName(),
                "description" => $item->getDescription(),
                "views" => $item->getViews(),

            ];


        }

        return $content;
    
    }
}
