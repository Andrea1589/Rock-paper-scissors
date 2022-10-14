initializeGame(5);

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

    //Remove initial message

    //Add round titles
    //const divRound =  document.getElementById('round-title');
    const divRound =  document.createElement('div');
    divRound.className = 'round-message';
    divRound.innerHTML = '<strong>ROUND ' + roundNumber + ': </strong>' + resultMessage;
    content.appendChild(divRound);
    //Add round messages
    //const divResult = document.getElementById('round-message');
    //const roundMessage =  document.createElement('div');
    //roundMessage.id = 'round-message';
    //roundMessage.textContent = resultMessage;
    //content.appendChild(roundMessage);

    //content.appendChild(document.createElement('br'));

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
    //document.body.addEventListener('click', function clickButton(event) {
    document.querySelectorAll('.player-buttons').forEach(item => {
        item.addEventListener('click', function clickPlayerOption (event) {
            //if (event.target.nodeName == 'BUTTON') {
                countRounds += 1;
                playerChoice = event.target.textContent.toLowerCase();
                let result = playRound(countRounds + '/' + maxRounds, playerChoice, getComputerChoice());

                //Clear initial message
                if (countRounds === 1) {
                    const divMessages = document.getElementById('initial-message');
                    divMessages.textContent = '';
                }
                //Sum points
                if (result === 'player') {
                    playerPoints += 1;
                } else if (result === 'computer') {
                    computerPoints += 1;
                } else {
                    playerPoints += 0.5;
                    computerPoints += 0.5;
                }

                //Update player's score
                const playerScore = document.getElementById('player-score');
                playerScore.textContent = playerPoints;

                //Update computer's score
                const computerScore = document.getElementById('computer-score');
                computerScore.textContent = computerPoints;

                //Remove event listener when reach max number of rounds
                //console.log(countRounds + '/' + maxRounds);
                if (countRounds == maxRounds) {

                    document.querySelectorAll('.player-buttons').forEach(item => {
                        item.removeEventListener('click', clickPlayerOption);
                    });

                    //const divResult = document.getElementById('round-title');
                    //const divMessage = document.getElementById('round-message');

                    const content = document.getElementById('game');
                    //const imgResult = document.getElementById('round-image');
                    const divFinalResult = document.createElement('div');

                    const buttonPlayAgain = document.createElement('button');
                    buttonPlayAgain.class = 'play-again';
                    buttonPlayAgain.addEventListener ('click', () =>{
                        initializeGame(maxRounds);
                    });
                        
                    if (playerPoints > computerPoints) {
                        const imgPlayerWins = document.getElementById('player1-image');
                        imgPlayerWins.style.cssText = 'background-image: url(./images/user-wins.png)';                
                        const imgComputerLose = document.getElementById('player2-image');
                        imgComputerLose.style.cssText = 'background-image: url(./images/computer-lose.png)';                
                        //imgResult.style.cssText = 'background-image: url(); height: 0;';
                        //imgResult.style.cssText = 'background-image: url(./images/bravo-message.png);';
                        divFinalResult.textContent = 'YOU WIN THE GAME! Congratulations!';
                        buttonPlayAgain.textContent = 'Play Again';
                        //Confetti
                        setInterval(createSquare, 150);
                    } else if (playerPoints == computerPoints) {
                        const imgComputerMatch = document.getElementById('player2-image');
                        imgComputerMatch.style.cssText = 'background-image: url(./images/computer-match.png)';                
                        //imgResult.style.cssText = 'background-image: url(); height: 0;';
                        divFinalResult.textContent = 'YOUR EVEN!';
                        buttonPlayAgain.textContent = 'Try Again';
                    } else {
                        const imgComputerWins = document.getElementById('player2-image');
                        imgComputerWins.style.cssText = 'background-image: url(./images/computer-wins.png)';                
                        //imgResult.style.cssText = 'background-image: url(); height: 0;';
                        //imgResult.style.cssText = 'background-image: url(./images/bravo-message.png); background-color: #9f9f9f;';
                        divFinalResult.textContent = 'THE COMPUTER WINS THE GAME!';
                        buttonPlayAgain.textContent = 'Try Again';
                    };

                    content.appendChild(divFinalResult);
                    content.appendChild(buttonPlayAgain);
                };
            //};
        });
    });
}

const color = [
    '2196f3',
    'e91e63',
    'ffeb3b',
    '74ff1d'
]

function createSquare(){
    const section = document.querySelector('player1-image');
    const square = document.createElement('span');
    var size = Math.random() * 50;

    square.style.width = 20 + size + 'px';
    square.style.height = 20 + size + 'px';

    square.style.top = Math.random() * innerHeight + 'px';
    square.style.left = Math.random() * innerHeight + 'px';

    const bg = colors [Math.floor(Math.random() * color.length)];
    square.style.background = bg;

    section.appendChild(square);

    setTimeout(() => {
        square.remove()
    },5000);
}

function initializeGame(maxRounds){
            //Initialize initial message
            const divMessages = document.getElementById('game');
            divMessages.textContent = '';

            const divInitialMessage =  document.createElement('div');
            divInitialMessage.id = 'initial-message';
            divInitialMessage.innerHTML = '<strong>LETS PLAY!</strong><br>Choose on of the options bellow your player. You have ' + maxRounds + ' rounds to win.';
            divMessages.appendChild(divInitialMessage);
        
            //Initialize scores
            const playerScore = document.getElementById('player-score');
            playerScore.textContent = 0;

            const computerScore = document.getElementById('computer-score');
            computerScore.textContent = 0;

            //Initialize images
            const imgPlayerWins = document.getElementById('player1-image');
            imgPlayerWins.style.cssText = 'background-image: url(./images/user.png)';                

            const imgComputerLose = document.getElementById('player2-image');
            imgComputerLose.style.cssText = 'background-image: url(./images/computer.png)';                

            const divImgGame = document.getElementById('round-image');
            divImgGame.style.cssText = 'background-image: url(./images/good-luck-message.png)';

            //Play
            game(maxRounds);
}