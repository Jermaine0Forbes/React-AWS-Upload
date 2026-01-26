<?php

namespace App\Service;

use App\Entity\User;
use App\Entity\Content;
use Symfony\Component\HttpFoundation\Request;
use Psr\Log\LoggerInterface;
use Doctrine\ORM\EntityManagerInterface;

final class ContentService
{

    public function __construct(
        private LoggerInterface $logger,
        private EntityManagerInterface $entityManager,
        private S3 $s3,

    ) {}


    public function getMedia(Content $c): array
    {
        $url = $this->s3->retrieve($c->getPath());
        return [
            "id" => $c->getId(),
            "name" => $c->getName(),
            "description" => $c->getDescription(),
            "path" => $url,
            "views" => $c->getViews(),
            "username" => $c->getUser()->getUsername(),
            "userId" => $c->getUser()->getId(),
        ];
    }

    public function getContent(): array
    {
        $collection =  $this->entityManager->getRepository(Content::class)->findBy([], ['id' => 'DESC']);
        $content = [];
        foreach ($collection as  $item) {
            $url = $this->s3->retrieve($item->getPath());
            $content[] = [
                "path" => $url,
                "id" => $item->getId(),
                "name" => $item->getName(),
                "views" => $item->getViews(),
                "created_at" => $item->getCreatedAt(),

            ];
        }

        return $content;
    }
}
