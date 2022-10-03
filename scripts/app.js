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

function playRound(playerSelection, computerSelection){
    let resultMessage = undefined;

    if (playerSelection === 'rock'){
        if(computerSelection === 'paper') {
            resultMessage = 'You Lose! Paper beats Rock';
        } else if (computerSelection === 'scissors') {
            resultMessage = 'You Win! Rock beats Scissors';
        } else {
            resultMessage = 'Your Even! Both chose Rock';
        }
    } else if (playerSelection === 'paper'){
        if(computerSelection === 'rock') {
            resultMessage = 'You Win! Paper beats Rock';
        } else if (computerSelection === 'scissors') {
            resultMessage = 'You Lose! Scissors beat Paper';
        } else {
            resultMessage = 'Your Even! Both chose Paper';
        }
    } else {
        if(computerSelection === 'rock') {
            resultMessage = 'You Lose! Rock beats Scissors';
        } else if (computerSelection === 'paper') {
            resultMessage = 'You Win! Scissors beat Paper';
        } else {
            resultMessage = 'Your Even! Both chose Scissors';
        }
    }

    //console.log('Computer choice: ' + computerSelection + ' Your choice: ' + playerSelection + '. ' + resultMessage);
    return resultMessage;

}

function game(maxRounds){
    let countRounds = 0;
    let playerChoice = '';

    //Add event listener on button options
    document.body.addEventListener('click', function clickButton(event) {
        if (event.target.nodeName == 'BUTTON') {
            countRounds += 1;
            playerChoice = event.target.textContent.toLowerCase();
            let result = playRound(playerChoice, getComputerChoice());

            //Alter the DOM to show results
            let content = document.querySelector('div');
            const div = document.createElement('div');
            div.textContent = 'Round ' + countRounds + ': ' + result;
            content.appendChild(div);
            
            //Remove event listener when reach max number of rounds
            if (countRounds == maxRounds) {
                document.body.removeEventListener('click', clickButton);
            };
        };
    });
}