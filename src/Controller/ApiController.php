<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Psr\Log\LoggerInterface;
use Symfony\Component\String\Slugger\SluggerInterface;
use App\DTO\UploadDTO;
use App\Service\FileUploader;

final class ApiController extends AbstractController
{
    #[Route('/api', name: 'app_api')]
    public function index(): JsonResponse
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/ApiController.php',
        ]);
    }

    #[Route('/api/profile/upload', name: 'app_api_profile_upload', methods: ['POST'])]
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
}
