const rollButton = document.getElementById('rollButton');
const restButton = document.getElementById('restButton');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const dice1Score = document.getElementById('dice1Score');
const dice2Score = document.getElementById('dice2Score');
const informationDisplay = document.getElementById('informationDisplay');
const player1Score = document.getElementById('player1Score');
const player2Score = document.getElementById('player2Score');
const player1Image = document.getElementById('player1Image');
const player2Image = document.getElementById('player2Image');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');



let totalPlayer1Score = 0;
let totalPlayer2Score = 0;
let dice1TotalScore = 0;
let dice2TotalScore = 0;



function randomPlayerSelect()
{
    var randomNumber = Math.floor(Math.random() * 2) + 1;
    if (randomNumber == 1)
    {
        informationDisplay.innerHTML = "Player 1's turn!";
        return "Player 1";
    }
    else
    {
        informationDisplay.innerHTML = "Player 2's turn!";
        return "Player 2";
    }
}


function activePlayer(player)
{
    if(player == "Player 1")
    {
        player1.classList.add('active');
        player2.classList.remove('active');
    }
    if(player == "Player 2")
    {
        player2.classList.add('active');
        player1.classList.remove('active');
    }
}


function swapPlayer(player)
{
    if(player == "Player 1")
        return "Player 2";

    if(player == "Player 2")
        return "Player 1";
}



function scoreCalculator(randomNumber1,randomNumber2,player)
{
    if(randomNumber1 == randomNumber2 && randomNumber1 == 1)
    {
        if(player == "Player 1")
            totalPlayer1Score = 0;

        if(player == "Player 2")
            totalPlayer2Score = 0;
    }
    else
    {
        dice1TotalScore = randomNumber1;
        dice2TotalScore = randomNumber2;
    }
}



function gameRules(player,randomNumber1,randomNumber2)
{
    if(randomNumber1 == randomNumber2 && randomNumber1 != 1)
    {
        informationDisplay.innerHTML = player + ", you have another Chance";
        globalPlayer = player;
        activePlayer(globalPlayer);
        return;
    }
    else
    {
        dice1TotalScore = 0;
        dice2TotalScore = 0;
        globalPlayer = swapPlayer(player);
        activePlayer(globalPlayer);
        informationDisplay.innerHTML = "Now " + globalPlayer + " Chance!";
    }
}




function rollDice(player)
{

    var randomNumber1 = Math.floor(Math.random() * 6) + 1;
    var randomNumber2 = Math.floor(Math.random() * 6) + 1;


    image1.src = " ./Dice_Images/Dice_Images/dice_" + randomNumber1 + ".png";
    image2.src = " ./Dice_Images/Dice_Images/dice_" + randomNumber2 + ".png";

    dice1Score.innerHTML = "Score: "+ randomNumber1;
    dice2Score.innerHTML = "Score: "+ randomNumber2;


    if(player == "Player 1")
    {
        scoreCalculator(randomNumber1,randomNumber2,player);
        totalPlayer1Score += dice1TotalScore + dice2TotalScore;
        player1Score.innerHTML = "Score: "+totalPlayer1Score;
    }
    
    if(player == "Player 2")
    {
        scoreCalculator(randomNumber1,randomNumber2,player);
        totalPlayer2Score += dice1TotalScore + dice2TotalScore;
        player2Score.innerHTML = "Score: "+totalPlayer2Score;
    }

    gameRules(player,randomNumber1,randomNumber2);

}


/* #################################################################################################### */


var globalPlayer = randomPlayerSelect();
informationDisplay.innerHTML = "Now "+globalPlayer+"'s Chance!";
activePlayer(globalPlayer);


rollButton.addEventListener('click', () =>{
    rollDice(globalPlayer);   

    if(totalPlayer1Score >= 100)
        {
            informationDisplay.innerHTML = "Player 1 Wins!";
            rollButton.style.display = "none";
            player1Image.src = "./Dice_Images/Dice_Images/winner.jpg";
            player2Image.src = "./Dice_Images/Dice_Images/loser.jpg";
            activePlayer("Player 1");
        }
        else if(totalPlayer2Score >= 100)
        {
            informationDisplay.innerHTML = "Player 2 Wins!";
            rollButton.style.display = "none";
            player1Image.src = "./Dice_Images/Dice_Images/loser.jpg";
            player2Image.src = "./Dice_Images/Dice_Images/winner.jpg";
            activePlayer("Player 2");
        }
    else if(totalPlayer1Score >= 100 && totalPlayer2Score >= 100)
    {
        informationDisplay.innerHTML = "Draw! the Game";
        rollButton.style.display = "none";
        player1Image.src = "./Dice_Images/Dice_Images/roll-dice.png";
        player2Image.src = "./Dice_Images/Dice_Images/roll-dice.png";
        player1.classList.remove('active');
        player2.classList.remove('active');
    }
    
} );



restButton.addEventListener('click', function() {
    window.location.reload();
});

