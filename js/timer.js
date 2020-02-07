var Timer = function(){
    var _this = this;
    this.time = 0;
    this.start = function () {
        this.interval = setInterval(function () {
            _this.time++;
            $('.time').html(_this.output());
        }, 1000);
    }
    this.stopIt = function () {
        clearInterval(this.interval);
    }
    this.output = function () {
        var minutes = parseInt(_this.time / 60, 10);
		var seconds = _this.time % 60;
        var finalTime = minutes + " min : " + Math.round(seconds)+" sec";
        return finalTime;
    }
    
}