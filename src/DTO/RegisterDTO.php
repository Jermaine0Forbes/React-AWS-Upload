<?php

namespace App\DTO;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\HttpFoundation\Request;

final class RegisterDTO 
{
    #[Assert\NotBlank]
    public ?string $username = null;

        #[Assert\NotBlank]
    public ?string $email = null;

        #[Assert\NotBlank]
    public ?string $password = null;

        #[Assert\NotBlank]
    public string | int | null $tier_id = null;

    public function validate(Request $request):self
    {   $req = $request->request;
        $user = $req->get('username');
        $email = $req->get('email');
        $pass = $req->get('password');
        $tier = $req->get('tier_id');

        if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
            throw new \Exception('email is not valid');
            }
        $this->email = trim($email);
        $this->username = trim($user);
        $this->password = trim($pass);
        if(!filter_var($tier, FILTER_VALIDATE_INT))
        {
            throw new \Exception('tier_id  is not valid');
        }
        $this->tier_id = (int)$tier;

        return $this;

    }

}