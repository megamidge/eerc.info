<?php
function greatestCommonDenominator($a, $b) {
    if($b == 0) return $a;
    return greatestCommonDenominator($b, $a % $b);
}
ini_set('display_errors', 1);
ini_set('display_startup_errors',1);
error_reporting(E_ALL);
if(isset($_POST["submit"])) {
    if(!isset($_POST["password"]) && $_POST["password"] != "valterrihotass_pepefuck321"){
        die("No or incorrect password.");
    }
    $target_dir = "../img/gallery/";
    $target_file_name = uniqid('uploaded-',true) . '.' . strtolower(pathinfo($_FILES['fileToUpload']['name'], PATHINFO_EXTENSION));
    $target_file = $target_dir . $target_file_name;
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    //Check is actual image
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if($check !== false) {
        echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }
    //Check file doesnt exist
    if(file_exists($target_file)){
        echo "Sorry, file already exists.";
        $uploadOk = 0;
    }
    //Check is supported file type
    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif"){
        echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
        $uploadOk = 0;
    }
    //Upload
    if($uploadOk == 0){
        echo "File NOT uploaded.";
        die();
    } else {
        if(move_uploaded_file($_FILES["fileToUpload"]["tmp_name"],$target_file)){
            echo "The file " . basename($_FILES["fileToUpload"]["name"]) . "has been uploaded.";
        } else {
            echo "Unknown error uploading file.";
            die();
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
    $dst = imagecreatetruecolor($arX, $arY);
    echo $arX . "   " . $arY;
    imagecopyresampled($dst, $image, 0,0,0,0,$arX,$arY, $width, $height);


    if($imageFileType == 'png')
        imagepng($dst,'temp.png');
    else if($imageFileType == 'jpeg' || $imageFileType == 'jpg')
        imagejpeg($dst,'temp.'.$imageFileType);
    else if($imageFileType == 'gif')
        imagegif($dst,'temp.gif');
    imagedestroy($dst);
    imagedestroy($image);
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
    echo $text;
    fwrite($metaFile, $text);
    fclose($metaFile);
}
?>
<style>
body{
    --accent-dark: #12181f;
	--accent-bright: #25415d;
	--accent-bright-alt: #4b6987;
	--alert: #cc0000;
	--colour-main: #18222c;
	--background: #2c3e50;
	--text: #d1d1d1;
	--text-hover: #797979;

	margin: 0;
	padding: 0;
	background-color: var(--background);
    color:var(--text);
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
form {
    background-color:var(--colour-main);
    padding:1rem;
    display:flex;
    flex-direction:column;
}
input{
    width:20rem;
    margin-bottom:0.4rem;
    background:var(--accent-dark);
    border:none;
    border-bottom:solid 0.1rem var(--accent-bright);
    color:var(--text);
}
/* .submit {
    border: solid 0.1rem var(--accent-bright);
    background: var(--accent-bright-alt);
} */
p{
    margin:0;
}
</style>
<form method="POST" enctype="multipart/form-data">
    <small><i>Admin page only. If you're not EERC staff, kindly fuck off back <a href="http://eerc.info">home</a>.</i></small>
    <h2>EERC Website Gallery Image Uploader</h2>
    <p>Password:</p>
    <input type="password" name="password" id="password" placeholder="password">
    <p>Image:</p>
    <input type="file" name="fileToUpload" id="fileToUpload">
    <h3>Meta data:</h3>
    <p>Description:</p>
    <input type="text" name="description" placeholder="What is going on here?">
    <p>League:</p>
    <input type="text" name="league" placeholder="MSR/GT/F1/M1E/DIRT">
    <p>Season:</p>
    <input type="text" name="season" placeholder="Season 1">
    <p>Race:</p>
    <input type="text" name="race" placeholder="Round 1">
    <p>Track:</p>
    <input type="text" name="track" placeholder="InDiAnapOlIs MoToR SPEeDwaY">
    <p>Extra tags (comma seperated):</p>
    <input type="text" name="tags" placeholder="Ooh, ee, ooh, ooh, ah, ting, tag, wallaballa, bing, bang">
    <input type="submit" value="Upload Image" name="submit" style="border: solid 0.1rem var(--accent-bright);background-color:var(--accent-bright-alt);">
</form>