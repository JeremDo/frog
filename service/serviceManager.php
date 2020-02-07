<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST, PUT, DELETE");
$action = "";

if(!empty($_GET['action'])){
    $action = $_GET['action'];
}
if(!empty($_POST['action'])){
    $action = $_POST['action'];
}

switch($action){

    case 'getScore':
    getScore();
    break;

    case 'postScore':
    postScore();
    break;
}

function getScore(){
    require ('contentService.php');
    $cs2 = new ContentService();
    echo $cs2->getScore();
}

function postScore(){
    require('contentService.php');
    $cs = new ContentService();
    echo $cs->postScore();
}