/* 
        Voir les commentaires de cars.js
*/
var Log = function (pDir, logsY) {
        _this = this;
        this.elem = $('<div class="log"></div>');
        this.domParent = $('.game');
        this.w = 350;
        this.x = 0;
        this.h = 50;
        this.y = logsY;
        this.direction = pDir;
        this.domParent.append(this.elem);
        this.elem.css({ width: this.w + "px", top: this.y + "px", height: this.h+"px" })
        if (_this.direction == "left") {
        _this.x = $('.game').width();
        _this.elem.css({left: _this.x+"px"}) ;
        }
        else {
        _this.x = -(_this.w);
        _this.elem.css({ left: _this.x + "px" });
        };
}