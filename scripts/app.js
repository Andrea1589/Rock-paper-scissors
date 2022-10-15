//The game is set up  for 5 rounds
initializeGame(5);

function getComputerChoice(){
    let cChoice = undefined;
    let numChoice = getRandomInt(3);

    const buttonComputerRock = document.getElementById('button-computer-rock');
    const buttonComputerPaper = document.getElementById('button-computer-paper');
    const buttonComputerScissors = document.getElementById('button-computer-scissors');

    switch(numChoice){
        case 0: 
            cChoice = 'rock';
            //Set buttons opacity
            buttonComputerRock.style.opacity = 1;
            buttonComputerPaper.style.opacity = 0.6;
            buttonComputerScissors.style.opacity = 0.6;
            break;
        case 1: 
            cChoice = 'paper';
            //Set buttons opacity
            buttonComputerRock.style.opacity = 0.6;
            buttonComputerPaper.style.opacity = 1;
            buttonComputerScissors.style.opacity = 0.6;
            break;
        case 2: 
            cChoice = 'scissors';
            //Set buttons opacity
            buttonComputerRock.style.opacity = 0.6;
            buttonComputerPaper.style.opacity = 0.6;
            buttonComputerScissors.style.opacity = 1;
            break;
    }

    return cChoice;
}

function getRandomInt(max){
    return Math.floor(Math.random()*max);
}

function playRound(roundNumber, playerSelection, computerSelection){
    let resultMessage = undefined;
    let winner = '';
    let roundImage = '';

    const buttonPlayerRock = document.getElementById('button-player-rock');
    const buttonPlayerPaper = document.getElementById('button-player-paper');
    const buttonPlayerScissors = document.getElementById('button-player-scissors');

    if (playerSelection === 'rock'){
        //Set buttons opacity
        buttonPlayerRock.style.opacity = 1;
        buttonPlayerPaper.style.opacity = 0.6;
        buttonPlayerScissors.style.opacity = 0.6;

        //Compare options
        if(computerSelection === 'paper') {
            resultMessage = 'Paper wraps rock. You lose this one!';
            roundImage = 'computer-paper-wraps-rock';
            winner = 'computer';
        } else if (computerSelection === 'scissors') {
            resultMessage = 'Rock blunts scissors. You win this one!';
            roundImage = 'player-rock-blunts-scissors';
            winner = 'player';
        } else {
            resultMessage = 'Both choose rock. Evenly matched!';
            roundImage = 'even-rock-equals-rock';
            winner = 'even';
        }
    } else if (playerSelection === 'paper'){
        //Set buttons opacity
        buttonPlayerRock.style.opacity = 0.6;
        buttonPlayerPaper.style.opacity = 1;
        buttonPlayerScissors.style.opacity = 0.6;

        //Compare options
        if(computerSelection === 'rock') {
            resultMessage = 'Paper wraps rock. You win this one!';
            roundImage = 'player-paper-wraps-rock';
            winner = 'player';
        } else if (computerSelection === 'scissors') {
            resultMessage = 'Scissors cuts paper. You lose this one!';
            roundImage = 'computer-scissors-cuts-paper';
            winner = 'computer';
        } else {
            resultMessage = 'Both choose paper. Evenly matched!';
            roundImage = 'even-paper-equals-paper';
            winner = 'even';
        }
    } else {
        //Set buttons opacity
        buttonPlayerRock.style.opacity = 0.6;
        buttonPlayerPaper.style.opacity = 0.6;
        buttonPlayerScissors.style.opacity = 1;

        //Compare options
        if(computerSelection === 'rock') {
            resultMessage = 'Rock blunts scissors. You lose this one!';
            roundImage = 'computer-rock-blunts-scissors';
            winner = 'computer';
        } else if (computerSelection === 'paper') {
            resultMessage = 'Scissors cuts paper. You win this one!';
            roundImage = 'player-scissors-cuts-paper';
            winner = 'player';
        } else {
            resultMessage = 'Both choose scissors. Evenly matched!';
            roundImage = 'even-scissors-equals-scissors';
            winner = 'even';
        }
    }
   
    const content = document.getElementById('game');
    
    //Add round messages
    const divRound =  document.createElement('div');
    divRound.className = 'round-message';
    /*divRound.innerHTML = '<strong>ROUND ' + roundNumber + ': </strong>' + resultMessage;
    content.appendChild(divRound);*/

    //Create game table
    //const table = document.createElement('table');
    const table = document.querySelector('table');
    //table.style.width = '100%';
    //table.style.border = '1px solid black';

    //Create header on Round # 1
    if (roundNumber === 1){
        let headArray = ['ROUND','YOU','COMPUTER','MESSAGE'];
        const thead = document.createElement('thead');
        const theadTr = document.createElement('tr');
        for (let i = 0; i < headArray.length; i++){
            const th = document.createElement('th');
            th.appendChild(document.createTextNode(headArray[i]));
            theadTr.appendChild(th);
            thead.appendChild(theadTr);
        }
        table.appendChild(thead);
        const tbody = document.createElement('tbody');
        table.appendChild(tbody);
    }

    //Create body
    let bodyArray = [roundNumber,playerSelection.toUpperCase(),computerSelection.toUpperCase(),resultMessage];
    const tbodyResult = document.querySelector('tbody');
    const tbodyTr = document.createElement('tr');
    for (let i = 0; i < bodyArray.length; i++){
        if (i == 0) {
            const thBody = document.createElement('th');
            thBody.appendChild(document.createTextNode(bodyArray[i]));
            tbodyTr.appendChild(thBody);
        } else {
            const td = document.createElement('td');
            td.appendChild(document.createTextNode(bodyArray[i]));
            tbodyTr.appendChild(td);
        }
        tbodyResult.appendChild(tbodyTr);
    }
    //table.appendChild(tbody);

    //Show image with the options selected by the player ans computer
    const divImgGame = document.getElementById('round-image');
    divImgGame.style.cssText = 'background-image: url(./images/' + roundImage + '.png)';

    return winner;
}

function game(maxRounds){
    let countRounds = 0;
    let playerChoice = '';
    let playerPoints = 0;
    let computerPoints = 0;

    //Add event listener on button options for the player
    document.querySelectorAll('.player-buttons').forEach(item => {
        item.addEventListener('click', function clickPlayerOption (event) {
            countRounds += 1;
            playerChoice = event.target.textContent.toLowerCase();
            let result = playRound(countRounds, playerChoice, getComputerChoice());

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

            if (countRounds == maxRounds) {

                document.querySelectorAll('.player-buttons').forEach(item => {
                    item.removeEventListener('click', clickPlayerOption);
                });

                const content = document.getElementById('game');
                const divFinalResult = document.createElement('div');
                divFinalResult.className = 'final-result';

                const buttonPlayAgain = document.createElement('button');
                buttonPlayAgain.className = 'play-again';
                buttonPlayAgain.addEventListener ('click', () =>{
                    initializeGame(maxRounds);
                });
                    
                if (playerPoints > computerPoints) {
                    const imgPlayerWins = document.getElementById('player1-image');
                    imgPlayerWins.style.cssText = 'background-image: url(./images/user-wins.png)';                
                    const imgComputerLose = document.getElementById('player2-image');
                    imgComputerLose.style.cssText = 'background-image: url(./images/computer-lose.png)';                
                    divFinalResult.innerHTML = '&#129321 YOU WIN THE GAME!';
                    buttonPlayAgain.textContent = 'PLAY AGAIN';
                } else if (playerPoints == computerPoints) {
                    const imgComputerMatch = document.getElementById('player2-image');
                    imgComputerMatch.style.cssText = 'background-image: url(./images/computer-match.png)';                
                    divFinalResult.innerHTML = '&#128528 EVENLY MATCHED!';
                    buttonPlayAgain.textContent = 'TRY AGAIN';
                } else {
                    const imgComputerWins = document.getElementById('player2-image');
                    imgComputerWins.style.cssText = 'background-image: url(./images/computer-wins.png)';                
                    divFinalResult.innerHTML = '&#128542 THE COMPUTER WINS THE GAME!';
                    buttonPlayAgain.textContent = 'TRY AGAIN';
                };

                content.appendChild(divFinalResult);
                content.appendChild(buttonPlayAgain);
            };
        });
    });
}


function initializeGame(maxRounds){
    //Initialize first message
    const divMessages = document.getElementById('game');
    divMessages.textContent = '';

    const divInitialMessage =  document.createElement('div');
    divInitialMessage.id = 'initial-message';
    divInitialMessage.innerHTML = '<h2>&#128170 LET&apos;S PLAY!</h2><ul><li>Choose one of the options bellow your player (rock, paper or scissors).</li><li>You will have one point each time you win the round.</li><li>You will have half point each time it is an evenly matched.</li><li>You have ' + maxRounds + ' rounds to win.</li><li>Are you ready?</li></ul>';
    divMessages.appendChild(divInitialMessage);

    //Create empty table 
    const gameSection = document.getElementById('game');
    const table = document.createElement('table');
    gameSection.appendChild(table);

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

    //Set player buttons opacity
    const buttonPlayerRock = document.getElementById('button-player-rock');
    buttonPlayerRock.style.opacity = 0.6;

    const buttonPlayerPaper = document.getElementById('button-player-paper');
    buttonPlayerPaper.style.opacity = 0.6;

    const buttonPlayerScissors = document.getElementById('button-player-scissors');
    buttonPlayerScissors.style.opacity = 0.6;

    //Set computer buttons opacity
    const buttonComputerRock = document.getElementById('button-computer-rock');
    buttonComputerRock.style.opacity = 0.6;

    const buttonComputerPaper = document.getElementById('button-computer-paper');
    buttonComputerPaper.style.opacity = 0.6;

    const buttonComputerScissors = document.getElementById('button-computer-scissors');
    buttonComputerScissors.style.opacity = 0.6;

    //Play
    game(maxRounds);
}