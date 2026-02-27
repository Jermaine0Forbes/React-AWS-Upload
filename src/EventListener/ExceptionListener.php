<?php

// src/EventListener/ExceptionListener.php
namespace App\EventListener;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

class ExceptionListener
{
    public function __invoke(ExceptionEvent $event): void
    {
        // You get the exception object from the received event
        $exception = $event->getThrowable();

        // Customize your response object to display the exception details
        $response = new Response();

        // HttpExceptionInterface is a special type of exception that
        if ($exception instanceof HttpExceptionInterface) {
            $response = new JsonResponse([
            'status' => $exception->getStatusCode(),
            'message' => $exception->getMessage(),
        ], $exception->getStatusCode());
        } else {

            $response = new JsonResponse([
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR,
            'message' => $exception->getMessage(),
            'ok' => false,
        ], Response::HTTP_INTERNAL_SERVER_ERROR);

        }

        // sends the modified response object to the event
        $event->setResponse($response);
    }
}