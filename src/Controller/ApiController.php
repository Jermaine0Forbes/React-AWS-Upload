<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Psr\Log\LoggerInterface;
use App\DTO\UploadDTO;

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
    public function profileUpload(Request $request, LoggerInterface $logger ): JsonResponse
    {

       

        $files = $request->files->all() ?? [];

        $metadata = array_map(function( $val) {
            if(is_string($val)){
                return json_decode($val, true);
            } else {
                return $val;
            }
        }, $request->request->all()) ?? [];

        
        $dto = new UploadDTO();
        try {
            $dto->files = is_array($files) ? $files : [$files];
            $dto->metadata = $metadata;
        } catch (\Exception $e) {
            $logger->error('Error processing upload data: ' . $e->getMessage());
            return $this->json([
                'status' => 'error',
                'message' => 'Invalid upload data.',
            ], 400);
        }



        return $this->json([
            'status' => 'success',
            'message' => 'File uploaded successfully!',
            'data' => 
            // $files,
            // sizeof($files),
            $dto->files[0]->getClientOriginalName() ?? null,
        ]);
    }
}
