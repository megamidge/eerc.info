
<?php
function greatestCommonDenominator($a, $b) {
    if($b == 0) return $a;
    return greatestCommonDenominator($b, $a % $b);
}
ini_set('display_startup_errors',true);
ini_set('display_errors', true);
error_reporting(E_ALL);
if(!isset($_POST["password"]) || $_POST["password"] != "valterrihotass_pepefuck321"){
    exit("No or incorrect password.");
}
$target_dir = "../img/gallery/";
$target_file_name = uniqid('uploaded-',true) . '.' . strtolower(pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION));
$target_file = $target_dir . $target_file_name;
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
//Check is actual image
$check = getimagesize($_FILES["file"]["tmp_name"]);
if($check !== false) {
    //echo "File is an image - " . $check["mime"] . ".";
    $uploadOk = 1;
} else {
    echo "File is not an image.<br/>";
    $uploadOk = 0;
}
//Check file doesnt exist
if(file_exists($target_file)){
    echo "Sorry, file already exists.<br/>";
    $uploadOk = 0;
}
//Check is supported file type
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" && $imageFileType != "webp"){
    echo "Sorry, only <b>JPG, JPEG, PNG, WEBP & GIF</b> files are allowed.<br/>";
    $uploadOk = 0;
}
//Upload
if($uploadOk == 0){
    die("File <b>NOT</b> uploaded.<br/>");
} else {
    if(move_uploaded_file($_FILES["file"]["tmp_name"],$target_file)){
        echo "<b>The file " . basename($_FILES["file"]["name"]) . " has been uploaded.</b><br/>";
    } else {
        echo "Unknown error uploading file.<br/>";

        unlink($target_file);
        die("Unknown error uploading file.<br/>");
    }
}
//get imgData as base64...
$img = file_get_contents($target_file);
list($width, $height) = getimagesize($target_file);
$gcd = greatestCommonDenominator($width, $height);
$arX = $width / $gcd;
$arY = $height / $gcd;
if($arX == $arY)
{
    $arX = 24;
    $arY = 24;
}
if($imageFileType == 'png')
    $image = imagecreatefrompng($target_file);
else if($imageFileType == 'jpeg' || $imageFileType == 'jpg')
    $image = imagecreatefromjpeg($target_file);
else if($imageFileType == 'gif')
    $image = imagecreatefromgif($target_file);
else if($imageFileType == 'webp')
    $image = imagecreatefromwebp($target_file);
if(!$image){
    unlink($target_file);
    die("Unhandled image error. Aborting. The uploaded image has been deleted.");
}
$dst = imagecreatetruecolor($arX, $arY);
echo $arX . "   " . $arY;
imagecopyresampled($dst, $image, 0,0,0,0,$arX,$arY, $width, $height);


if($imageFileType == 'png')
    $res = imagepng($dst,'temp.png');
else if($imageFileType == 'jpeg' || $imageFileType == 'jpg')
    $res = imagejpeg($dst,'temp.'.$imageFileType);
else if($imageFileType == 'gif')
    $res = imagegif($dst,'temp.gif');
else if($imageFileType == 'webp')
    $res = imagewebp($dst,'temp.webp');
imagedestroy($dst);
imagedestroy($image);
if(!$res){
    die("Unkown image error. Image might have uploaded properly but something has failed. Shrug reacts only.");
}
$smallImage = file_get_contents('temp.'.$imageFileType);
$imgData = 'data:image/png;base64,'.base64_encode($smallImage);

//meta time, epic...
$metaFile = fopen($target_file . ".json","w");
$object = new stdClass();
$object->image = "/img/gallery/" . $target_file_name;
$object->name = $target_file_name;
if($_POST["description"] != "")
    $object->description = $_POST['description'];
if($_POST["league"] != "")
    $object->league = $_POST["league"];
if($_POST["season"] != ""){
    if(strpos(strtolower($_POST["season"]),'round') == false)
        $race = "Season" . $_POST["season"];
    $object->season = $_POST["season"];
}
if($_POST["race"] != ""){
    if(strpos(strtolower($_POST["race"]),'round') == false)
        $race = "Round" . $_POST["race"];
    $object->race = $_POST["race"];
}
if($_POST["track"] != "")
    $object->track = $_POST["track"];
if($_POST["tags"] != ""){
    $object->tags = explode(",", $_POST["tags"]);
}
$object->lowRes = $imgData;
$text = json_encode($object,JSON_UNESCAPED_SLASHES);
fwrite($metaFile, $text);
fclose($metaFile);
exit("Done");