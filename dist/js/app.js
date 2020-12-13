let selectedNumbers;
let won = [100,1000];
const STAKE_STATUS = 'Amount Staked';
const WON_STATUS = 'You\'ve won';
let STAKE_AMOUNT = 0;

const selectors = document.querySelectorAll('.selector');
const btnRoll = document.getElementById('btn-roll');
const diceImage = document.querySelector('#dice');
const compScore = document.getElementById('cpu-score');
const userScore = document.getElementById('user-score');

const btnStake = document.querySelector('#stake-btn');
const statusText = document.getElementById('status');
const stakeAmountText = document.querySelector('#stake-amount');
const stakeAmountInput = document.getElementById('stake');
const alert = document.querySelector('.alert');
const btnQuit = document.querySelector('#btn-quit');



console.log(alert);

/* INIT GAME VARIABLES */
init();


function init(){
    alert.textContent = '';
    selectedNumbers = [];
    statusText.textContent = STAKE_STATUS;
    stakeAmountText.textContent = '$0';
    stakeAmountInput.value = '';
    userScore.textContent = '$'+won[0];
    compScore.textContent = '$'+won[1];
    STAKE_AMOUNT = 0;
}


btnStake.addEventListener('click', function () {
    const stakeInput = stakeAmountInput.value;
    if (stakeInput !== ''){
        STAKE_AMOUNT = parseInt(stakeInput);
        if (STAKE_AMOUNT > won[0]){
            STAKE_AMOUNT = 0;
            alert.textContent = 'You have insufficient credit. Please top up';
            alert.classList.add('form-alert');
            setTimeout(function () {
                alert.textContent = '';
                alert.classList.remove('form-alert');
            },3000);

        }else{
            alert.textContent = '';
            alert.classList.remove('form-alert');
            stakeAmountInput.value = '';
            statusText.textContent = STAKE_STATUS;
            stakeAmountText.textContent = '$'+stakeInput;
            userScore.textContent = '$'+ (won[0] -= stakeInput);
        }
    }
});



selectors.forEach((selected) => {
    selected.addEventListener('click', () => {
        selected.classList.toggle('selected');
        const selectedNumber = parseInt(selected.textContent);

        const index = selectedNumbers.indexOf(selectedNumber);
        if (index > -1){
            selectedNumbers.splice(index,1)
        }else {
            selectedNumbers.push(selectedNumber)
        }

    });


});



btnRoll.addEventListener('click', function () {
    const rolled = Math.floor(Math.random() * 6) + 1;

    diceImage.src = `images/dice-${rolled}.png`;
    let hasWon = false;

    if (selectedNumbers.length > 0){
        for (let i = 0; i < selectedNumbers.length; i++){

            if (rolled === selectedNumbers[i]){
                document.querySelector('.number-'+rolled).classList.add('won');
                hasWon = true;
                const amountWon = odd() * STAKE_AMOUNT;

                console.log('you\'ve won ' + amountWon);

                statusText.textContent = WON_STATUS;
                stakeAmountText.textContent = amountWon.toString();
                won[0] += amountWon;
                won[1] -= (amountWon - STAKE_AMOUNT);

                if (won[1] < 0){
                    alert.textContent = 'Congrat!!! You\'re really Good';
                    alert.classList.add('alert-success');
                }
            }

        }
    }

    if (!hasWon){
        won[1] += STAKE_AMOUNT;
    }

    resetGame();


});

btnQuit.addEventListener('click', function () {
    won[0] = 100;
    won[1] = 1000;
    diceImage.src = `images/dice-default.png`;
   init();
});


function resetGame() {
    init();
    selectors.forEach( (selected) => {
       selected.classList.remove('selected');
        setTimeout(function () {
            selected.classList.remove('won');
        },3000);
    });
}



function odd() {
    switch (selectedNumbers.length) {
        case 1:
            return 6;

        case 2:
            return 5;

        case 3:
            return 4;

        case 4:
            return 3;

        case 5:
            return 2;

        case 6:
            return 1;

    }
}

