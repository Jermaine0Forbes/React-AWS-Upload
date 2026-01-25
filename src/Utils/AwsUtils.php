<?php

namespace App\Utils;
use Aws\Credentials\Credentials;

final class AwsUtils{

  public function __construct(
    private string $bucketName,
    private string $region,
    private string $apiVersion,
  ) {

  }



}