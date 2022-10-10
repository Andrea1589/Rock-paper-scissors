//Start playing
    game(5);

//The participant choose one option (rock, paper or scissors) secretly
function getComputerChoice(){
    let cChoice = undefined;
    let numChoice = getRandomInt(3);
    //console.log(numChoice);
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

    //console.log(img);
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

    if (playerSelection === 'rock'){
        if(computerSelection === 'paper') {
            resultMessage = 'You Lose! Paper beats Rock';
            winner = 'computer';
        } else if (computerSelection === 'scissors') {
            resultMessage = 'You Win! Rock beats Scissors';
            winner = 'player';
        } else {
            resultMessage = 'Your Even! Both chose Rock';
            winner = 'even';
        }
    } else if (playerSelection === 'paper'){
        if(computerSelection === 'rock') {
            resultMessage = 'You Win! Paper beats Rock';
            winner = 'player';
        } else if (computerSelection === 'scissors') {
            resultMessage = 'You Lose! Scissors beat Paper';
            winner = 'computer';
        } else {
            resultMessage = 'Your Even! Both chose Paper';
            winner = 'even';
        }
    } else {
        if(computerSelection === 'rock') {
            resultMessage = 'You Lose! Rock beats Scissors';
            winner = 'computer';
        } else if (computerSelection === 'paper') {
            resultMessage = 'You Win! Scissors beat Paper';
            winner = 'player';
        } else {
            resultMessage = 'Your Even! Both chose Scissors';
            winner = 'even';
        }
    }

    const content = document.getElementById('messages');

    const divRound = document.createElement('div');
    divRound.textContent = 'Round ' + roundNumber + ':';
    divRound.className = 'round-title';
    content.appendChild(divRound);

    const divImgHands = document.createElement('div');
    divImgHands.className = 'img-hands';

    const playerImg = document.createElement('img');
    playerImg.setAttribute('class', playerSelection + '-left');
    divImgHands.appendChild(playerImg);

    const divResult = document.createElement('div');
    divResult.textContent = resultMessage;
    divResult.className = 'round';
    divImgHands.appendChild(divResult);

    const computerImg = document.createElement('img');
    computerImg.setAttribute('class', computerSelection + '-right');
    divImgHands.appendChild(computerImg);
    
    content.appendChild(divImgHands);

    /*const divResult = document.createElement('div');
    divResult.textContent = resultMessage;
    divResult.className = 'round';
    content.appendChild(divResult);*/
    //console.log('Computer choice: ' + computerSelection + ' Your choice: ' + playerSelection + '. ' + resultMessage);
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
            //console.log('Choice: ' + playerChoice);
            let result = playRound(countRounds, playerChoice, getComputerChoice());

            //Sum points
            if (result === 'player') {
                playerPoints += 1;
            } else if (result === 'computer') {
                computerPoints += 1;
            }
           
            //Remove event listener when reach max number of rounds
            if (countRounds == maxRounds) {
                document.body.removeEventListener('click', clickButton);

                let content = document.getElementById('messages')
                const divResult = document.createElement('div');
                divResult.className = 'result';

                if (playerPoints > computerPoints) {
                    divResult.textContent = 'YOU WIN THE GAME! CONGRATULATIONS!';
                } else if (playerPoints == computerPoints) {
                    divResult.textContent = 'YOUR EVEN!';
                } else {
                    divResult.textContent = 'THE COMPUTER WINS THE GAME!';
                };
                content.appendChild(divResult);
            };
        };
    });
}