var Game = function(){
    var _this = this;
    this.randSpeedCar = [];
    this.speedLimits = [
        {//niveau 1
            randCarRefreshMin: 50, //les valeurs refresh servent a definir les min et max pour les generations aleatoires des setIntervals des voitures
            randCarRefreshMax: 50,
            randStepMin: 2, //min et max pour la definition du pas aleatoire 
            randStepMax: 3,
            randLogRefresh: 50, // correspond aux ms passé au setInterval des logs
        },
        {//niveau 2
            randCarRefreshMin: 30,
            randCarRefreshMax: 45,
            randStepMin: 3,
            randStepMax: 7,
            randLogRefresh: 40,
        },
        {//niveau 3
            randCarRefreshMin: 20,
            randCarRefreshMax: 30,
            randStepMin: 5,
            randStepMax: 8,
            randLogRefresh: 30,
        },
        {//niveau 4
            randCarRefreshMin: 15,
            randCarRefreshMax: 20,
            randStepMin: 8,
            randStepMax: 7,
            randLogRefresh: 20,
        },
        {//niveau 5
            randCarRefreshMin: 10,
            randCarRefreshMax: 10,
            randStepMin: 10,
            randStepMax: 10,
            randLogRefresh: 10,
        }
    ];
    this.lanes = [400, 450, 500, 550, 600,650]; //y possibles pour les voitures
    this.flows = [50, 100, 150, 200, 250, 300];//y possibles pour les buches
    Config.game = _this;
    Config.frog = Frog.init();
    this.carList = Config.cars;
    this.logList = Config.logs;
    if (Config.level == null) { //si le niveau est null (debut de game)
        Config.level = 1;
    }
    else { //si on a deja avancé d'au moins un niveau
        Config.level++;
    }
    $('.level').html("Niveau " + Config.level); //append du niveau
    if (Config.timer == null) {//si le timer n'a jamais été créé on en créé un et on le démarre
        Config.timer = new Timer();
        Config.timer.start();
    }
    // Génération des voitures avec vitesse et direction aleatoires---------------------------
    for (var i = 0; i <= $('.lane').length - 1; i++){ //pour chaque voie
        var randDir = Math.floor((Math.random() * 2) + 1); 
        var randSpeed2 = Math.floor((Math.random() * this.speedLimits[Config.level-1].randCarRefreshMax) +this.speedLimits[Config.level-1].randCarRefreshMin);//generation aleatoire des ms  pour le setInterval
        _this.randSpeedCar.push(randSpeed2)//création du tableau des ms des setInterval
        var carsY = _this.lanes[i]; //on recupère chaque lane avec le y correspondant
        if (randDir == 1) { //génération des voitures en fonction de leur direction
            var c = new Car("left", carsY);
            
        }
        else {
            var c = new Car("right", carsY);
        }
        Config.cars.push(c);//on créé le tableau des voitures
    };
    //-------------------------------------------------------------------------------------------------
    // Génération des buches---------------------------------------------------------------------
    var randDirLog = 0;
    for (var i = 0; i <= $('.flow').length - 1; i++){
        var logsY = _this.flows[i];
        if (randDirLog == 1) {
            var l = new Log("left", logsY);
            randDirLog = 0;
        }
        else {
            var l = new Log("right", logsY);
            randDirLog = 1;
        }
        Config.logs.push(l);
    };
    // Gestion du mouvement des tutures----------------------------------------------------
    for (var j = 0; j < Config.cars.length; j++){ //pour chaque voiture
        var randPix = Math.floor((Math.random() * this.speedLimits[Config.level-1].randStepMax) + this.speedLimits[Config.level-1].randStepMin); //definition d'un pas aléatoire
        var int = setInterval(function (j, randPix) { //setInterval pour le mouvement
            if (_this.carList[j].direction == "left") {  //si on va a gauche
                _this.carList[j].x = _this.carList[j].x - randPix; //modification de l'attribut x
                if (_this.carList[j].x <= -1 - _this.carList[j].w) { //si la voiture est tout à gauche
                    _this.carList[j].x = $('.game').width() + _this.carList[j].w; //on la remet a droite
                }
                _this.carList[j].elem.css({ left: _this.carList[j].x + "px" });//si on etait pas tout à gauche on avance
                Frog.checkCollision(); // vérification de collision avec la grenouille
            }
            else {//si on va a droite...
                _this.carList[j].x = _this.carList[j].x + randPix;
                if (_this.carList[j].x >= $('.game').width() + 1) {
                    _this.carList[j].x = -1 - _this.carList[j].w;
                }
                _this.carList[j].elem.css({ left: _this.carList[j].x + "px" });
                Frog.checkCollision();
            }
        }, _this.randSpeedCar[j], j, randPix);
    }
    //------------------------------------------------------------------------------------------------
// Gestion du mouvement des  bubuches-----------------------------------------------------
    for (var j = 0; j < Config.logs.length; j++){ //boucle pour l'appliquer à chaque buche
        var randPix = Math.floor((Math.random() * this.speedLimits[Config.level - 1].randStepMax) + this.speedLimits[Config.level - 1].randStepMin);//génération d'un pas différent pour chaque setInterval
        if (j == 5) {
        }
        this["interval"+j] = setInterval(function (j, randPix) { //mise en place de l'interval qui permet le mouvement
            if (_this.logList[j].direction == "left") { // gestion du mouvement vers la gauche------------------------------------------------
                if ((_this.logList[j].y < Frog.y && _this.logList[j].y + _this.logList[j].h > Frog.y+Frog.h) && (_this.logList[j].x <= Frog.x && _this.logList[j].x + _this.logList[j].w >= Frog.x+Frog.w)) {//si il y a collision avec la grenouille
                    var logPos = Frog.x - _this.logList[j].x; //calcul de la distance entre le bord gauche de la buche et celui de la grenouille
                    if (_this.logList[j].x <  -_this.logList[j].w) { //si la buche est completement passée à gauche
                        _this.logList[j].x = $('.game').width(); //on definis le x de la buche au bord droit du jeu
                        Frog.x =_this.logList[j].x + logPos; //on applique le meme principe a la grenouille en reapplicant la distance entre les 2 bords gauches
                        _this.logList[j].elem.css({ left: _this.logList[j].x + "px" }); //application du css pour faire bouger la buche 
                        Frog.elem.css({left: Frog.x+"px"})//pareil pour la grenouille
                    }
                    else {
                        _this.logList[j].x = _this.logList[j].x - randPix;
                        _this.logList[j].elem.css({ left: _this.logList[j].x + "px" });//si on est  pas en train de passer l'ecran, on applique simplement le css
                        Frog.x = Frog.x - randPix;    
                        Frog.elem.css({left: Frog.x+"px"})
                    }
                }
                else { //si la grenouille n'est pas sur la buche, on bouge simplement la buche
                        _this.logList[j].x = _this.logList[j].x - randPix;    
                        if (_this.logList[j].x < 0 - _this.logList[j].w) {//gestion du repositionnement de la buche a droite quand la grenouille n'est pas dessus
                    _this.logList[j].x = $('.game').width();
                    }
                    _this.logList[j].elem.css({ left: _this.logList[j].x + "px" });
                }
                
            }//--------------------------------------------------------------------------------------------------
            else { //gestion du mouvement vers la droite--------------------------------------------------
                if ((_this.logList[j].y < Frog.y && _this.logList[j].y + _this.logList[j].h > Frog.y+Frog.h) && (_this.logList[j].x <= Frog.x && _this.logList[j].x + _this.logList[j].w >= Frog.x+Frog.w)) {
                    var logPos = Frog.x - _this.logList[j].x;
                    if (_this.logList[j].x > $('.game').width()) {
                        _this.logList[j].x = 0 - _this.logList[j].w;
                        Frog.x = _this.logList[j].x + logPos
                            ;
                        _this.logList[j].elem.css({ left: _this.logList[j].x + "px" });
                        Frog.elem.css({left: Frog.x+"px"})
                    }
                    else {
                        _this.logList[j].x = _this.logList[j].x + randPix;
                        Frog.x = Frog.x + randPix;
                        _this.logList[j].elem.css({ left: _this.logList[j].x + "px" });
                        Frog.elem.css({left: Frog.x+"px"})
                    }
                }
                else {
                    _this.logList[j].x = _this.logList[j].x + randPix;
                    if (_this.logList[j].x >= $('.game').width()) {
                    _this.logList[j].x = 0 - _this.logList[j].w;
                    }
                    _this.logList[j].elem.css({ left: _this.logList[j].x + "px" });
                }
                    
            }
        },this.speedLimits[Config.level-1].randLogRefresh, j, randPix);
    }//--------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------
}