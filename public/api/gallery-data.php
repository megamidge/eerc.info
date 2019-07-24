<?php
$fileList = glob("../img/gallery/*.json");
// echo var_dump($fileList);
// $jsonObjects = array();
foreach($fileList as &$file){
    // echo "hi";
    $fileContents = file_get_contents($file);
    // echo var_dump(json_decode($fileContents));
    // array_push($jsonObjects,json_decode($fileContents));
    $json[] = json_decode($fileContents,true);
}

if(!isset($json))
    exit('[]');
echo json_encode($json,JSON_PRETTY_PRINT);