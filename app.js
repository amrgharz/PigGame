/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/* Declaring variables */

var scores, roundScore, activePlayer, dice, gamePlaying;

init();

document.querySelector(".btn-roll").addEventListener('click', function(){
    if(gamePlaying){
        //Difeine the dice random number
        dice = Math.floor(Math.random() * 6) + 1;

        //Change the image according to the random number

        var diceDom = document.querySelector(".dice");
        diceDom.style.display = 'block';
        diceDom.src = "dice-" + dice + ".png"

        //Update the round score if the dice number was NOT one.
        if(dice !== 1){
            //Add to round score
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        }else{
            //Next Player
        nextPlayer(); 
        }
    }
    
});

// Implementing the hold functionality

document.querySelector(".btn-hold").addEventListener("click", function(){

    if(gamePlaying){
    //updating the global score    
    scores[activePlayer] += roundScore;
    //updating the UI
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer]
    //check if the player won
    if(scores[activePlayer] >= 20){
        document.querySelector(".dice").style.display = "none";
        document.querySelector(".player-" + activePlayer + "-panel").classList.add('winner');
        document.querySelector(".player-" + activePlayer + "-panel").classList.remove('active');
        document.querySelector("#name-" + activePlayer).textContent = "you won biaaatch!!!:)"
        gamePlaying = 0;
    }else{
        //next player/change the active player
        nextPlayer();
    }

    }

})

function nextPlayer (){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    // set the scores to zero
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    //Change the Active Player
    document.querySelector(".player-0-panel").classList.toggle("active")
    document.querySelector(".player-1-panel").classList.toggle("active")

    document.querySelector('.dice').style.display = "none";   
}

document.querySelector(".btn-new").addEventListener('click', init)

//initalize game function

function init (){
    scores = [0,0];
    roundScore = 0;
    activePlayer= 0;
    gamePlaying = true;

    //hide the dice at the begining
    document.querySelector(".dice").style.display = 'none';

    // set the values to 0 at the
    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    document.getElementById("name-0").textContent = "player 1";
    document.getElementById("name-1").textContent = "player 2";
    document.querySelector(".player-0-panel").classList.remove('winner');
    document.querySelector(".player-1-panel").classList.remove('winner');
    document.querySelector(".player-0-panel").classList.remove('active');
    document.querySelector(".player-1-panel").classList.remove('active');
    document.querySelector(".player-0-panel").classList.add('active');

}