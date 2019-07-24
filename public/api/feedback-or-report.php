<?php
if(!isset($_POST['type']) || !isset($_POST['message']))
    die('Both type and message must be defined!');
if($_POST['type'] == 'none' || $_POST['message'] = '')
    die('Feedback type or message cannot be empty.');
session_start();//Start a session
if(isset($_SESSION['lastSend']) && time() - $_SESSION['lastSend'] < 60 * 60) {//1 hour
    //Dont send it
    $timeleft = floor((60 * 60 - (time() - $_SESSION['lastSend']))/60);
    die("In an effort to reduce spam, please wait $timeleft minutes before sending another feedback or report form.");
}
else{
    $email = 'eerc.contact@gmail.com';
    $headers = 'From: web-feedback@eerc.info' . "\r\n";
    $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
    $headers .= 'X-Mailer: PHP/' . phpversion() . "\r\n";
    $message = $_POST['message'];
    $subject = 'new ' . $_POST['type'] . ' form from eerc.info';
    $result = mail($email,$subject,$message,$headers);
    if(!$result){
        die('An unknown error occurred. Contact a site-admin.');
    }
    else{
        $_SESSION['lastSend'] = time();
        exit('Thank you for your ' . $_POST['type'] . ' submission. Your ' . $_POST['type'] . ' is much appreciated.');
        //After-success:
    }
}
