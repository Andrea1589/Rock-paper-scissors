//The participant choose one option (rock, paper or scissors) secretly
function getComputerChoice(){
    let computerChoice = undefined;
    let numChoice = getRandomInt(3);
    console.log(numChoice);
    switch(numChoice){
        case 0: 
            computerChoice = 'rock';
            break;
        case 1: 
            computerChoice = 'paper';
            break;
        case 2: 
            computerChoice = 'scissors';
            break;
    }

    return computerChoice;
}

function getRandomInt(max){
    return Math.floor(Math.random()*max);
}

function playerChoice() {
    let pChoice = prompt('Enter your choice (rock, paper or scissors):');
    console.log(pChoice);
    return pChoice;
}
//At the same time the participant show their option to each other
//The participant who beats the other according the next description wins
//1- Scissors beats paper
//2- Paper beats rock
//3- Rock beats scissors