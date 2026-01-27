<?php

namespace App\DTO;
use Symfony\Component\Validator\Constraints as Assert;

final class LoginDTO 
{
        #[Assert\NotBlank]
    public ?string $username = null;

            #[Assert\NotBlank]
    public ?string $password = null;
}