var Car = function (pDir, carsY) {
    _this = this; //pour les changements de scope 
    this.elem = $('<div class="car"></div>'); // element utilisé dans le dom
    this.domParent = $('.game'); //recupération du parent
    this.w = 100; //width
    this.x = 0; //position sur l'axe des x
    this.h = 50;//height
    this.y = carsY; //definition de la position sur l'axe des y en fonction du paramètre
    this.direction = pDir; //direction de la voiture
    this.domParent.append(this.elem); //on applique dans le dom l'objet
    this.elem.css({ width: this.w + "px", top: this.y + "px", height:  "50 px" }) //application du css de la voiture
    if (_this.direction == "left") {// si on va a gauche
        _this.x = $('.game').width(); //la voiture demarre a droite du jeu 
        _this.elem.css({left: _this.x+"px"}) ; //application du css
    }
    else {//sinon on va a droite
        _this.x = -(_this.w);//la voiture commence à gauche du jeu 
        _this.elem.css({ left: _this.x + "px" }); //application du css
    };
}


