var Config = {
    game: null,
    frog: null,
    cars: [],
    logs: [],
    timer: null,
    level: null,
        // fonctions pour appliquer les messages de fin de partie
        gameOver: function () { 
            Config.timer.stopIt();
            Config.cars = [];
            Config.logs = [];
            $('div').remove('.frog');
            $('div').remove('.car');
            $('div').remove('.log');
            $('.game').append($('<div class="overlay"></div>'))
            $(".overlay").append('<span>Satan réclame son dû.</span><br><a href="index.html" id="replay">Rejouer</a><br><form method="post" action="index.html" id="sendScore"><span>Envoie ton score:</span><br><input type="text" name="name" id="name"><input id="time" type="hidden" name="time" value="' + Config.timer.output() + '"><input id="level" type="hidden" name="level" value="' + Config.level + '"><br><button type="submit">Envoyer</button></form>'); //création de l'écran de fin
            $('#sendScore').on('submit', function (e) {
                e.preventDefault();
                e.stopPropagation();
                data = {
                    name: $('#name').val(),
                    time: $('#time').val(),
                    level: $('#level').val(),
                }
                $('#sendScore').hide();
                $.post("http://www.jdub.fr/service/serviceManager.php?action=postScore", data)
                    .done(function () {
                        $('.overlay').append($('<p>Votre score a correctement été ajouté</p>'))
                    })
                    .fail(function() {
                        $('.overlay').append($('<p>Une erreur est survenue lors de l\inscription de votre score dans la base de données</p>'))
                    })
            })
        },
        win: function () {
            $('div').remove('.frog');
            $('div').remove('.car');
            $('div').remove('.log');
            $('.game').append($('<div class="overlay"></div>'));
            $(".overlay").append('<span>Bien joué mon gars !</span><br><a href="index.html" id="replay">Niveau suivant</a>');
            $('#replay').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                for (var k = 0; k <= 5; k++){
                    clearInterval(Config.game["interval"+k])
                }
                Config.cars = [];
                Config.logs = [];
                $('div').remove('.overlay');
                $(window).off('keyup')
                Frog.x = 580;
                Frog.y = 705;
                delete Config.game;
                Config.game = new Game();
            });
        }
}