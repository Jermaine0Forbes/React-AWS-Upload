<?php

namespace App\Utils;
use Aws\S3\S3Client;

final class AwsUtils{

  public function __construct(
    private string $bucketName,
    private string $region,
    private string $apiVersion,
  ) {

  }


  public function getBucket(): string 
  {
    return $this->bucketName;
  }

  public function getRegion(): string
  {
    return $this->region;
  }

  public function getS3():S3Client
  {

   return new S3Client([
     "region" => $this->region,
     "version" => $this->apiVersion,
     "scheme" => "http",
   ]);
  }


}