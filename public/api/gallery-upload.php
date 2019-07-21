
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
<?php
function greatestCommonDenominator($a, $b) {
    if($b == 0) return $a;
    return greatestCommonDenominator($b, $a % $b);
}
ini_set('display_startup_errors',true);
ini_set('display_errors', true);
error_reporting(E_ALL);
session_start();
if(isset($_SESSION['messages']) && count($_SESSION['messages'])){
    foreach($_SESSION['messages'] as &$message){
        echo $message;
    }
}
$_SESSION['messages'] = array();
if(isset($_POST["submit"])) {
    if(!isset($_POST["password"]) || $_POST["password"] != "valterrihotass_pepefuck321"){
        array_push($_SESSION['messages'], "Incorrect password.<br/>");
        header("Location:gallery-upload.php");
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
        //echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        array_push($_SESSION['messages'], "File is not an image.<br/>");
        echo "File is not an image.<br/>";
        $uploadOk = 0;
    }
    //Check file doesnt exist
    if(file_exists($target_file)){
        array_push($_SESSION['messages'], "Sorry, file already exists.<br/>");
        echo "Sorry, file already exists.<br/>";
        $uploadOk = 0;
    }
    //Check is supported file type
    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif"){
        array_push($_SESSION['messages'], "Sorry, only <b>JPG, JPEG, PNG & GIF</b> files are allowed.<br/>");
        echo "Sorry, only <b>JPG, JPEG, PNG & GIF</b> files are allowed.<br/>";
        $uploadOk = 0;
    }
    //Upload
    if($uploadOk == 0){
        array_push($_SESSION['messages'], "File <b>NOT</b> uploaded.<br/>");
        echo "File <b>NOT</b> uploaded.<br/>";
        header("Location:gallery-upload.php");
        die();
    } else {
        if(move_uploaded_file($_FILES["fileToUpload"]["tmp_name"],$target_file)){
            array_push($_SESSION['messages'], "<b>The file " . basename($_FILES["fileToUpload"]["name"]) . " has been uploaded.</b><br/>");
            echo "<b>The file " . basename($_FILES["fileToUpload"]["name"]) . "has been uploaded.</b><br/>";
        } else {
            array_push($_SESSION['messages'], "Unknown error uploading file.<br/>");
            echo "Unknown error uploading file.<br/>";

            unlink($target_file);
             header("Location:gallery-upload.php");
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
    if(!$image){
        unlink($target_file);

        array_push($_SESSION['messages'], "Unhandled image error. Aborting. The uploaded image has been deleted.");
        header("Location:gallery-upload.php");
        die("Unhandled image error. Aborting.");
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
    imagedestroy($dst);
    imagedestroy($image);
    if(!$res){
        array_push($_SESSION['messages'], "Unkown image error. Image might have uploaded properly but something has failed. Shrug reacts only.");
        header("Location:gallery-upload.php");
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

    header("Location:gallery-upload.php");
}
?>

<form method="POST" enctype="multipart/form-data">
    <small><i>Admin page only. If you're not EERC staff, kindly fuck off back <a href="http://eerc.info">home</a>.</i></small>
    <h2>EERC Website Gallery Image Uploader</h2>
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
    <p>Password:</p>
    <input type="text" name="password" id="password" placeholder="password" autocomplete="password">
    <input type="submit" value="Upload Image" name="submit" style="border: solid 0.1rem var(--accent-bright);background-color:var(--accent-bright-alt);">
</form>