$(document).ready(function () {
    //création du contenu de l'ecran titre
    $('.overlay').append('<h1>Frog</h1><button class="start">Jouer</button><div class="scores"><h2>Leaderboard</h2><table><tr><th>Nom</th><th>Temps</th><th>Niveau</th></tr></table></div>');
    //recupération des données de la bdd
    $.get("http://www.jdub.fr/service/serviceManager.php?action=getScore", function (data) {
        var retour = JSON.parse(data);
        retour.forEach(element => { //on créé une ligne du tableau par entree de la bdd
            row = "<tr><td>"+element.name+"</td><td>"+element.time+"</td><td>"+element.level+"</td></tr>";
            $("table").append(row); //insertion dans le dom
        });
    });
    $('.scores').delay(1000).animate({ left: 0 }); //au bout de 1s on fait un e animation pour faire apparaitre les scores
    
    $('.start').on('click',function(){ //au click sur le bouton start
        $('div').remove('.overlay'); //on vire l'overlay
        //on append les fichier js manquants
        $('#js').append('<script src="./js/config.js"></script><script src="./js/game.js"></script><script src="./js/cars.js"></script><script src="./js/logs.js"></script><script src="./js/timer.js"></script>');
        Config.game = new Game(); //on démarre la game
    });
});