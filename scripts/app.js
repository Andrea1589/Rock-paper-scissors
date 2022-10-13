//Start playing
game(5);

//The participant choose one option (rock, paper or scissors) secretly
function getComputerChoice(){
    let cChoice = undefined;
    let numChoice = getRandomInt(3);

    switch(numChoice){
        case 0: 
            cChoice = 'rock';
            break;
        case 1: 
            cChoice = 'paper';
            break;
        case 2: 
            cChoice = 'scissors';
            break;
    }

    return cChoice;
}

function getRandomInt(max){
    return Math.floor(Math.random()*max);
}

//At the same time the participant show their option to each other
//The participant who beats the other according the next description wins
//1- Scissors beats paper
//2- Paper beats rock
//3- Rock beats scissors

function playRound(roundNumber, playerSelection, computerSelection){
    let resultMessage = undefined;
    let winner = '';
    let roundImage = '';

    if (playerSelection === 'rock'){
        if(computerSelection === 'paper') {
            resultMessage = 'You lose this one!';
            roundImage = 'computer-paper-wraps-rock';
            winner = 'computer';
        } else if (computerSelection === 'scissors') {
            resultMessage = 'You win this one!';
            roundImage = 'player-rock-blunts-scissors';
            winner = 'player';
        } else {
            resultMessage = 'Evenly matched!';
            roundImage = 'even-rock-equals-rock';
            winner = 'even';
        }
    } else if (playerSelection === 'paper'){
        if(computerSelection === 'rock') {
            resultMessage = 'You win this one!';
            roundImage = 'player-paper-wraps-rock';
            winner = 'player';
        } else if (computerSelection === 'scissors') {
            resultMessage = 'You lose this one!';
            roundImage = 'computer-scissors-cuts-paper';
            winner = 'computer';
        } else {
            resultMessage = 'Evenly matched!';
            roundImage = 'even-paper-equals-paper';
            winner = 'even';
        }
    } else {
        if(computerSelection === 'rock') {
            resultMessage = 'You lose this one!';
            roundImage = 'computer-rock-blunts-scissors';
            winner = 'computer';
        } else if (computerSelection === 'paper') {
            resultMessage = 'You win this one!';
            roundImage = 'player-scissors-cuts-paper';
            winner = 'player';
        } else {
            resultMessage = 'Evenly matched!';
            roundImage = 'even-scissors-equals-scissors';
            winner = 'even';
        }
    }

    const content = document.getElementById('game');

    const divRound =  document.getElementById('round-title');
    divRound.textContent = 'ROUND ' + roundNumber;

    const divResult = document.getElementById('round-message');
    divResult.textContent = resultMessage;

    const divImgGame = document.getElementById('round-image');
    divImgGame.style.cssText = 'background-image: url(./images/' + roundImage + '.png)';


    /*const computerImg = document.createElement('img');
    computerImg.setAttribute('class', computerSelection + '-right');
    divImgHands.appendChild(computerImg);*/
    
    //content.appendChild(divImgHands);

    /*const divResult = document.createElement('div');
    divResult.textContent = resultMessage;
    divResult.className = 'round';
    content.appendChild(divResult);*/
    return winner;
}

function game(maxRounds){
    let countRounds = 0;
    let playerChoice = '';
    let playerPoints = 0;
    let computerPoints = 0;

    //Add event listener on button options
    document.body.addEventListener('click', function clickButton(event) {
        if (event.target.nodeName == 'BUTTON') {
            countRounds += 1;
            playerChoice = event.target.textContent.toLowerCase();
            let result = playRound(countRounds + ' OF ' + maxRounds, playerChoice, getComputerChoice());

            //Sum points
            if (result === 'player') {
                playerPoints += 1;
            } else if (result === 'computer') {
                computerPoints += 1;
            }
           
            //Remove event listener when reach max number of rounds
            //console.log(countRounds + '/' + maxRounds);
            if (countRounds == maxRounds) {
                document.body.removeEventListener('click', clickButton);

                const divResult = document.getElementById('round-title');
                const divMessage =  document.getElementById('round-message');
                const imgResult = document.getElementById('round-image');
                            
                if (playerPoints > computerPoints) {
                    const imgPlayerWins = document.getElementById('player1-image');
                    imgPlayerWins.style.cssText = 'background-image: url(./images/user-wins.png)';                
                    const imgComputerLose = document.getElementById('player2-image');
                    imgComputerLose.style.cssText = 'background-image: url(./images/computer-lose.png)';                
                    imgResult.style.cssText = 'background-image: url(./images/bravo-message.png);';
                    divResult.textContent = 'YOU WIN THE GAME!';
                    divMessage.textContent = 'Bravo! Congratulations!';
                } else if (playerPoints == computerPoints) {
                    const imgComputerMatch = document.getElementById('player2-image');
                    imgComputerMatch.style.cssText = 'background-image: url(./images/computer-match.png)';                
                    imgResult.style.cssText = 'background-image: url(); height: 0;';
                    divResult.textContent = 'YOUR EVEN!';
                    divMessage.textContent = 'Try again';
                } else {
                    const imgComputerWins = document.getElementById('player2-image');
                    imgComputerWins.style.cssText = 'background-image: url(./images/computer-wins.png)';                
                    imgResult.style.cssText = 'background-image: url(./images/bravo-message.png); background-color: #9f9f9f;';
                    divResult.textContent = 'THE COMPUTER WINS THE GAME!';
                    divMessage.textContent = 'Try again';
                };

                //content.appendChild(divResult);
            };
        };
    });
}