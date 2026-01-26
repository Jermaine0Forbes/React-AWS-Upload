<?php

namespace App\Service;

use App\Utils\AwsUtils;
use Aws\S3\S3Client;
use Aws\Exception\AwsException;


class S3
{

    private ?string $bucket;

    private ?S3Client $s3;

    public function __construct(private AwsUtils $utils)
    {
        $this->s3 = $this->utils->getS3();
        $this->bucket = $this->utils->getBucket();
    }

    public function upload(array $partialObject):string
    {
        $result = null;
        try {

            $object = $this->prepareObject($partialObject);

           $result =  $this->s3->putObject($object);
        } catch (AwsException $e) {
             echo $e->getMessage();
            // throw \AwsException($e->getMessage());
        }

        // $x = str_replace('http', 'https', $result->get('ObjectURL'));

        return  $result->get('ObjectURL');
    }


    private function prepareObject(array $halfObject = []):array 
    {

        $otherHalfObject = [
            'Bucket' => $this->bucket,
        ];

        $fullObject = array_merge($otherHalfObject, $halfObject);

        return $fullObject;
    }

    public function retrieve(string $key):string
    {
        $object = $this->prepareObject([
            "Key" => $key,
        ]);
        $url = "";

        try {
            $cmd = $this->s3->getCommand('GetObject', $object);
            $url = $this->getUrl($cmd);
        } catch(AwsException $e) {
            echo $e->getMessage();
        }
        return $url;
    }

    private function getUrl($command):string
    {
        $exp = "+3 minutes";
        $url  = (string)$this->s3->createPresignedRequest($command, $exp)->getUri();
        // $replaced = str_replace("https://my-example-bucket-jf-1.s3.us-east-2.amazonaws.com/http%3A/",
        // "https:/"
        // ,
        // $url
        // );
        // $decode = json_decode($replaced);
        // $decode = json_encode($replaced);
        // $decode = urlencode($replaced);
        // $decode = urldecode($replaced);
        return $url;
    }
}
