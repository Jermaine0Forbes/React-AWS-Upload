<?php

namespace App\Service;

use App\Entity\User;
use App\Entity\Plan;
use App\Entity\SubscriptionLimit;
use Symfony\Component\HttpFoundation\Request;
use Psr\Log\LoggerInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\DTO\RegisterDTO;
use App\DTO\LoginDTO;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

final class UserService
{

    private ?User $user;

    public function __construct(
        private LoggerInterface $logger,
        private EntityManagerInterface $entityManager,
        private S3 $s3,
        private UserPasswordHasherInterface $passwordHasher,
        private JWTTokenManagerInterface $jwt,
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

    public function retrieveContent(Request $request): array
    {
        $id = intval($request->attributes->get('id'));
        $this->checkUser($id);
        $user = $this->getUser();
        $content = [];
        $collection = array_reverse($user->getContents()->toArray());

        foreach ($collection as $key => $item) {
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

    public function createJwt(User $user): array
    {
        return [
            "id" => $user->getId(),
            "username" => $user->getUsername(),
            "email" => $user->getEmail(),
            "expiration" => $user->getSubscriptionLimit()->getExpirationDate(),
            "token" => $this->jwt->create($user),

        ];

        
    }

    public function validateRegistration(Request $request): RegisterDTO
    {
        return (new RegisterDTO)->validate($request);
    }

    public function register(Request $request): array
    {

        $dto = $this->validateRegistration($request);
        $user = new User();

        $userExists = $this->entityManager->getRepository(User::class)->findBy([ "username" => $dto->username]);

        if($userExists) {
           throw new \Exception('Username already exists');
        }


        $plan = $this->entityManager->getRepository(Plan::class)->findOneById($dto->tier_id);
        $user->setUsername($dto->username);
        $user->setEmail($dto->email);
        $user->setTier($plan);

        $hashedPassword = $this->passwordHasher->hashPassword(
            $user,
            $dto->password
        );
        $user->setPassword($hashedPassword);

        $connection = $this->entityManager->getConnection();

        try {
            $connection->beginTransaction();

            //creates the user
            $this->entityManager->persist($user);
            $this->entityManager->flush();

            //creates the subscription plan limit
            $subLimit = new SubscriptionLimit();
            $subLimit->setUser($user);
            $subLimit->setPlan($plan);
            match ($dto->tier_id) {
                1 => $subLimit->setMax(4),
                2 => $subLimit->setMax(8),
                3 => $subLimit->setMax(12),
                default => $subLimit->setMax(4),
            };
            $subLimit->setExpirationDate((new \DateTime())->modify('+30 days'));
            $user->setSubscriptionLimit($subLimit);
            $this->entityManager->persist($subLimit);
            $this->entityManager->flush();

            $connection->commit();
        } catch (\Exception $e) {
            $connection->rollBack();
            throw new \Exception('Could not register user');
        }

        return $this->createJwt($user);
    }


    public function login(Request $request):array
    {
        $req = $request->request;
        $dto = new LoginDTO();
        $dto->username = $req->get('username');
        $dto->password = $req->get('password');
        $user = $this->entityManager->getRepository(User::class)->findOneBy(['username' => $dto->username]);

        if (!$user) {
            throw new BadCredentialsException();
        }
        if (!$this->passwordHasher->isPasswordValid($user, $dto->password)) {
            // Password is valid, proceed with authentication logic (e.g., generate a token)
            throw new BadCredentialsException();
        }

        return $this->createJwt($user);
    }
}
