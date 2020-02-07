<?php 
class Connexion{
    private static $_instance = null;
    private static $ONLINE = false;
    public $bdd;
    public function __construct(){
        if(!Connexion::$ONLINE){
            $this->bdd = new PDO('mysql:host=http://www.jdub.fr;dbname=Database operations
db746191009', 'dbo746191009', 'Proxima01!', array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
        }
        else{
            //mettre ici les infos de connexion sur un service distant. 
        }
    }
    //methodes
    //listeners
    //Getters - Setters
public static function getInstance(){
  
    if(is_null(self::$_instance)){
        self::$_instance = new Connexion();
    }
    return self::$_instance;
}
}