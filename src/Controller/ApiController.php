<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Service\FileUploader;
use App\Service\S3;
use App\Service\UserService;
use App\Service\ContentService;
use App\Entity\User;
use App\Entity\Content;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Entity\SubscriptionLimit;
use App\Entity\Plan;
use App\Utils\AwsUtils;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Attribute\MapQueryParameter;
use Symfony\Component\HttpFoundation\Response;

final class ApiController extends AbstractController
{
    #[Route('/api/user/generate', name: 'app_api_generate_user', methods: ['POST'])]
    public function generateUser(
        #[MapQueryParameter] ?string $username,
        #[MapQueryParameter] ?string $email,
        #[MapQueryParameter] ?int $tier,
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher
    ): JsonResponse {
        $tierId = $tier ?? 1;
        $user = new User();
        $plan = $entityManager->getRepository(Plan::class)->findOneById($tierId);
        $randomNum = rand(1000, 9999);
        $user->setUsername($username ?? 'user'.$randomNum);
        $user->setEmail($email ?? "user$randomNum@example.com");
        $user->setTier($plan);

        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            'password'
        );
        $user->setPassword($hashedPassword);

        $connection = $entityManager->getConnection();

        try {
            $connection->beginTransaction();

            //creates the user
            $entityManager->persist($user);
            $entityManager->flush();

            //creates the subscription plan limit
            $subLimit = new SubscriptionLimit();
            $subLimit->setUser($user);
            $subLimit->setPlan($plan);
            match ($tierId) {
                1 => $subLimit->setMax(4),
                2 => $subLimit->setMax(8),
                3 => $subLimit->setMax(12),
                default => $subLimit->setMax(4),
            };
            $subLimit->setExpirationDate((new \DateTime())->modify('+30 days'));
            $entityManager->persist($subLimit);
            $entityManager->flush();

            $connection->commit();
        } catch (\Exception $e) {
            $connection->rollBack();
            return $this->json([
                'message' => 'Error creating user: ' . $e->getMessage(),
                'status' => 'error',
            ], 500);
        }

        return $this->json([
            'message' => "user: ".$user->getUsername().",  has been generated!",
            'status' => 'success',
        ]);
    }

    #[Route('/api/user/get/{id:user}', name: 'app_api_get_user', methods: ['GET'])]
    public function getUserData(User $user): JsonResponse
    {
        if (!$user) {
            return $this->json([
                'message' => 'User not found',
                'status' => 'error',
            ], 404);
        }
        return $this->json($user->getProfileData(), 200);
    }

    #[Route('/api/profile/{id}/upload', name: 'app_api_profile_upload', methods: ['POST'])]
    public function profileUpload(
        Request $request,
        FileUploader $fileUploader
    ): JsonResponse {



        $dto = $fileUploader->checkFiles($request);

        $result = $fileUploader->upload($dto);

        if ($result) {

            return $this->json([
                'status' => 'success',
                'message' => 'File uploaded successfully!',
            ], 200);
        } else {
            return $this->json([
                'status' => 'error',
                'message' => 'File upload failed.',
            ], 500);
        }
    }
    #[Route('/api/user/{id}/content', name: 'app_api_get_content', methods: ['GET'])]
    public function getUserContent(Request $request, UserService $us ): JsonResponse
    {
        $content = $us->retrieveContent($request);

        return  $this->json($content);
    }

    #[Route('/api/media/{id:content}', name: 'app_api_get_media', methods: ['GET'])]
    public function getMediaData( Content $content, ContentService $cs ): JsonResponse
    {
        $media = $cs->getMedia($content);

        return  $this->json($media);
    }

    #[Route('/api/credentials', name: 'app_api_credentials', methods: ['GET'])]
    public function getCreds(Request $request,
    #[Autowire(service: 's3_service')] S3 $s3){
        $url = $s3->retrieve();
        return new Response("</img src='$url' />", 200, ['content-type' => 'text/html']);
    }
}
