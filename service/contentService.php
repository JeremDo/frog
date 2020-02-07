<?php
class ContentService{
    private $connexion;
    private $bdd;
    private $template;
    private $tabMenu;
    private $tabContent;
    private $pdo;
    public function __construct(){
        require ("connexion.php"); 
        $this->connexion = Connexion::getInstance();
        $this->bdd = $this->connexion->bdd;
    }

    public function getScore(){
        $stmt = $this->bdd->prepare('SELECT * FROM frogscores');
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $retour =json_encode($result);
        return $retour;
    }

    public function postScore(){
        $stmt = $this->bdd->prepare('insert into frogscores (name, time, level) values ("'.$_POST["name"].'","'.$_POST["time"].'","'.$_POST['level'].'")');
        if($stmt->execute()){
            $ret = $stmt->errorInfo();
        }
        else{
            $ret = 'error';
        }
        var_dump($ret);
        exit;
        return $ret;
    }
}