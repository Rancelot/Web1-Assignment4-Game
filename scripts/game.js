var turnScore = 0, beatVal = 0, player1, player2, turnPlayer, pastPlayer, p1Score = 0, p2Score = 0;
var p1status = true, p2status = false;
var pchecker = 0;

$(document).ready(function (){
    startup();
    loadNewGame();
});

function startup (){
    $(".top").hide();
    $("#gameArea").hide();
    $("#newInfo").show();
    $("#playerScore").show();
}

function loadNewGame(){
  "use strict";
    $("form").on("submit", function (event) {
        event.preventDefault();

        player1 = document.getElementsByName("player1")[0].value;
        player2 = document.getElementsByName("player2")[0].value;

        if (!player1){
          player1 = "Player 1";
        }
        if (!player2){
          player2 = "Player 2";
        }
        //NAME WRITTEN ON SITE
        $("#p1name").html(player1);
        $("#p2name").html(player2);

        $("#gameArea").show();
        $(".top").show();

        $("#endTurn").click(function() { endTurn(); });
        $("#endGame").click(function() { endGame(); });

        turnSetUp();
        //cardPoints();

    });
}

function turnSetUp(){
  "use strict";
    $.post("http://ins.mtroyal.ca/~nkhemka/test/process.php").done(function(data){
        var deck = $.parseJSON(data);
        beatVal = deck.Cards[0].value;

        $("#beatSum").html(beatVal);
        $("#gameArea div").each(function(index){
            $(this).removeClass("card0 card1 card2 card3 card4 chosen");
        })
        $("#gameArea div").each(function(index){
            $(this).addClass("card"+deck.Cards[index+1].value);
        })

    });
    console.log("turnSetup for player " + identifyTurn());
    cardPoints();
}

function identifyTurn() {
  "use strict";
  console.log("identifyTurn " + pchecker);
    if (pchecker % 2 == 0){
            $("#current").html(player1);
            return "1";
        }
    else {
            $("#current").html(player2);
            return "2";
        }
}

function endTurn() {
  "use strict";
  var currentPlayer = identifyTurn();
  console.log("currentPlayer is player " + currentPlayer);
    if (turnScore >= beatVal){
            //alert("You managed to get higher than or equal to the score to beat! Good Job!");
            if (currentPlayer == "1"){
              p1Score+=8;
            }
            else if (currentPlayer == "2") {
              p2Score+=8;
            }
            setScore();
    }
    else {
            if (currentPlayer == "1"){
              alert("What a shame," + player1 + " did not beat the sum required.")
            }
            else if (currentPlayer == "2"){
              alert("What a shame," + player2 + " did not beat the sum required.")
            }
    }
    console.log(p1Score + " and " + p2Score);

    turnScore = 0; //reset score
    pchecker = pchecker + 1;
    console.log("increment " + pchecker);
    //identifyTurn();
    turnSetUp();
}

function setScore() {
  "use strict";
  $("#score1").html(p1Score);
  $("#score2").html(p2Score);
}
function endGame() {
  "use strict";
    location.reload();

}

function cardPoints(){
  "use strict";
    $(".card").click(function(){
        if ($(this).hasClass("card0") && (!$(this).hasClass("chosen"))){
            turnScore+=0;
            console.log("score "+turnScore);
        }
        else if ($(this).hasClass("card1") && (!$(this).hasClass("chosen"))){
            turnScore+=1;
            console.log("score "+turnScore);
        }
        else if ($(this).hasClass("card2") && (!$(this).hasClass("chosen"))){
            turnScore+=2;
            console.log("score "+turnScore);
        }
        else if ($(this).hasClass("card3") && (!$(this).hasClass("chosen"))){
            turnScore+=3;
            console.log("score "+turnScore);
        }
        else if ($(this).hasClass("card4") && (!$(this).hasClass("chosen"))){
            turnScore+=4;
            console.log("score "+turnScore);
        }
        $(this).addClass("chosen");
    })
}
