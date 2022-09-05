'use strict';

let secretNumber = Number(Math.trunc(Math.random() * 20) + 1);

console.log(secretNumber);

const beginScore = Number(document.querySelector('.score').textContent);

const delay = millisec => new Promise(res => setTimeout(res, millisec));


async function blink(element, text, millisec, iter) {
    while (iter > 0) {

         document.querySelector(element).textContent = text;

         await delay(millisec);

        document.querySelector(element).textContent = '';

         await delay(millisec);

         iter--;
    }
}

function displayMessage(msg) {
    document.querySelector('.message').textContent = msg;
}

function reset () {
    secretNumber = Number(Math.trunc(Math.random() * 20) + 1);

    console.log(secretNumber);

    displayMessage('Start guessing...');

    document.querySelector('body').style.backgroundColor = '#222';

    document.querySelector('.number').style.width = '15rem';

    document.querySelector('.score').textContent = beginScore;

    document.querySelector('.guess').value = null;

    document.querySelector('.number').textContent = '?';

}

document.querySelector('.check').addEventListener('click', async function () {

    let numberGuess = Number(document.querySelector('.guess').value);

    //when guess is correct
    if (numberGuess === secretNumber && Number(document.querySelector('.score').textContent) > 1)
    {
        blink('.message', 'Correct!', 200, 10);

        document.querySelector('body').style.backgroundColor = '#60b347';

        document.querySelector('.number').style.width = '30rem';

        document.querySelector('.number').textContent = secretNumber;

        if (Number(document.querySelector('.highscore').textContent) < Number(document.querySelector('.score').textContent) )
            {
                document.querySelector('.highscore').textContent = Number(document.querySelector('.score').textContent);
            }
        Number(document.querySelector('.score').textContent)

        await delay(4000);

        reset();
    }
    //when no number is entered
    else if (!numberGuess && Number(document.querySelector('.score').textContent) > 1) {
       displayMessage('At least enter a number, homie!');
    }
    //when guess is too high or low
    else if (numberGuess !== secretNumber  && Number(document.querySelector('.score').textContent) > 1) {
        numberGuess > secretNumber ? displayMessage('Lower...') : displayMessage('Higher...');
        document.querySelector('.score').textContent = Number(document.querySelector('.score').textContent) - 1;
    }
    //when score hits zero or some other weird scenario
    else
    {
        displayMessage('Inference is futile!');

        document.querySelector('body').style.backgroundColor = '#e32727';

        document.querySelector('.score').textContent = 'X';

        await delay(4000);

        reset();
    }
}
)

document.querySelector('.again').addEventListener('click', function () {
    reset();
});
 


