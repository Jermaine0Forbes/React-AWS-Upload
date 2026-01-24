<?php

namespace App\DTO;

use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Validator\Constraints as Assert;

final class UploadDTO
{
    /**
     * @var UploadedFile[]
     */
    #[Assert\All([
        new Assert\File(maxSize: '5M'),
    ])]
    public array $files = [];

    #[Assert\NotBlank]
    public ?array $metadata = [];
}
