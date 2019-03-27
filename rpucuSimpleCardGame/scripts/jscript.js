/*global $, player1: true, loadGame, turnSetUp, console, endGame, setUpCardPoints, addPlayerScore, onPlayer:true, offPlayer: true*/
var player1, player2, turnScore = 0, beatVal = 0, p1Score = 0, p2Score = 0, isPlayerOnesTurn = true, onPlayer="", offPlayer="", gameStart = false;

$(document).ready(function () {
    $(".hide").hide();
    initListeners();
});

//Set ups all the listeners needed for the game to function
function initListeners() {
    loadGame();                     // add submit listener
    turnEnderListener();            //end turn listener
    gameEnderListener();            //end game listener
    setUpCardPoints();              //click card listener
    turnSetUp();
}
//Asks user if they want to restart the game when "New Game" button is pressed.
function restartGame() {
            if (confirm("Restart Learning Addition?")){
                location.reload();
            }
        
}

function loadGame() {
    $("form").on("submit", function(event) {
        event.preventDefault();
        
    if (gameStart){
        restartGame();
    }
    else{
        player1 = document.getElementsByName("player1")[0].value;
        player2 = document.getElementsByName("player2")[0].value;
        
        if (!player1) {
            player1 = "Player 1";
        }
        if (!player2){
            player2 = "Player 2";
        }
        onPlayer = player2;//player2
        offPlayer = player1;//player1
        playerMoveTitle();
        $("#p1name").html(player1);
        $("#p2name").html(player2);
        $(".top").show();
        $("#gameArea").show();
        gameStart = true;
    }
    });
    
}

function turnEnderListener(){
    $("#endTurn").click(function() {
        endTurn();
    });
}

function gameEnderListener(){
    
    $("#endGame").click(function(){
        endGame(); 
    });
}

//determines who is making a move in current turn
function playerMoveTitle() {
    if (offPlayer == player1){
        $("#current").html(player1);
    }
    else if (offPlayer == player2){
        $("#current").html(player2);
    }
}

//Sets up game area with cards
function turnSetUp() {
    playerMoveTitle();
    $.post("http://ins.mtroyal.ca/~nkhemka/test/process.php").done(function(data){
        var deck = $.parseJSON(data);
        beatVal = deck.Cards[0].value;
        $("#beatSum").html(beatVal);
        $("#gameArea div").each(function(index){
            $(this).removeClass("card0 card1 card2 card3 card4 chosen");
        });
        $("#gameArea div").each(function(index){
            $(this).addClass("card"+deck.Cards[index + 1].value);
        });
        
    });                                       
}

//Applies points to each card image
function setUpCardPoints() {
        $(".card").click(function(){
        if($(this).hasClass("card0") && (!$(this).hasClass("chosen"))){
            turnScore+=0;
            console.log("Score " + turnScore);
        }
        if($(this).hasClass("card1") && (!$(this).hasClass("chosen"))){
            turnScore+=1;
            console.log("Score " + turnScore);
        }
        if($(this).hasClass("card2") && (!$(this).hasClass("chosen"))){
            turnScore+=2;
            console.log("Score " + turnScore);
        }
        if($(this).hasClass("card3") && (!$(this).hasClass("chosen"))){
            turnScore+=3;
            console.log("Score " + turnScore);
        }
        if($(this).hasClass("card4") && (!$(this).hasClass("chosen"))){
            turnScore+=4;
            console.log("Score " + turnScore);
        }
        $(this).addClass("chosen");
    });
}

//Determines which player's turn it is
function whoseTurn() {
    "use strict";
    if (isPlayerOnesTurn)
    {
        onPlayer = player1;
        offPlayer = player2;
    }
    else {
        onPlayer = player2;
        offPlayer = player1;
    }
    isPlayerOnesTurn = !isPlayerOnesTurn;
    console.log(isPlayerOnesTurn);
}

//End Game button functions and messages
function endGame(){
    if (p1Score>p2Score){
        alert(player1 + " WINS! Better luck next time, " + player2 + ".");
        location.reload();
    }
    else if (p2Score>p1Score){
        alert(player2 + " WINS! Better luck next time, " + player1 + ".");
        location.reload();
    }
    else if (p1Score==p2Score){
        alert(player1 + " and " + player2 + " have a tie. GOOD JOB YOU TWO!");
        location.reload();
    }
}

//Updates player scores
function update(){
    $("#score1").html(p1Score);
    $("#score2").html(p2Score);
}

//Adds player scores depending on selected cards
function addPlayerScore(){
     if (turnScore >= beatVal){
        if (onPlayer == player1){
            p1Score+=10;
            alert("You are right " + player1 + "! You score 10 points, it is now " + player2 + "'s turn.");
        }
        else if (onPlayer == player2){
            p2Score+=10;
            alert("You are right " + player2 + "! You score 10 points, it is now " + player1 + "'s turn.");
        }
        
    }
    else{
        alert("What a shame, you are wrong. You did not beat the sum.");
    }
}

//End Turn button functions
function endTurn() {
    whoseTurn();
    console.log("OnPlayer " + onPlayer);
    addPlayerScore();
    update();
    turnScore=0; //reset score that must beat sum for next turn
    turnSetUp();
    
}