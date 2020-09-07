
// Global Variables
const keyBoard = document.querySelector( '#qwerty' );
const phraseUL = document.querySelector( '#phrase' ).firstElementChild;
const startBtn = document.querySelector( '.btn__reset' );
const overlay = document.getElementById( 'overlay' );
const subTitle = document.querySelector( '.subTitle' );
const scoreboard = document.querySelector('#scoreboard')
const hearts = document.querySelectorAll('.tries')
let missed = 0;
const phrases = [
    'A BLESSING IN DISGUISE',
    'A DIME A DOZEN',
    'ONCE IN A BLUE MOON', 
    'EVERY DOG HAS HIS DAY', 
    'IT TAKES TWO TO TANGO'
];

// Randomly chooses phrase from phrases array, returns a new array of characters from the randomly chosen phrase
function getRandomPhraseAsArray ( arr ) {
    let randomPhrase = arr[ Math.floor( Math.random() * arr.length ) ];
    let phraseArray = randomPhrase.split('');
    return phraseArray;
}

phraseArray = getRandomPhraseAsArray( phrases );

// Loops through array of characters and appends them to the #phrase ul as list items
function addPhraseToDisplay( arr ) {
    for ( let i = 0; i < arr.length; i++ ) {
        const listItem = document.createElement('li');
        listItem.textContent = arr[i];
        phraseUL.append(listItem);
        if ( listItem.textContent !== ' ' ) {
            listItem.className = 'letter';
        } else {
            listItem.className = 'space';
        }
    }
}

addPhraseToDisplay(phraseArray);

// checks to see if phrase letters match the keyboard btn clicked
function checkLetter( button ) {
    const letter = document.querySelectorAll( '.letter' )
    let match = null;
    for ( let i = 0; i < letter.length; i++ ) {
        if ( button.textContent === letter[i].textContent.toLowerCase() ) {
            letter[i].className += ' show';
            match = letter[i].textContent;
        }
    }
    return match;
}

// checks to see if the game has been won
function checkWin() {
    const letter = document.querySelectorAll( '.letter' );
    const show = document.querySelectorAll( '.show' );
    if ( letter.length === show.length ) {
        overlay.className += ' win';
        overlay.style.display = 'flex';
        subTitle.textContent = "We have a winner!";
        scoreboard.style.display = 'none';
        startBtn.textContent = 'Try Again';
    } else if ( missed >= 5 ) {
        overlay.className += ' lose';
        overlay.style.display = 'flex';
        subTitle.textContent = `Sorry, the correct answer was "${phraseArray.join('')}"`;
        scoreboard.style.display = 'none';
        startBtn.textContent = 'Try Again';
    }
}

// listen for the on screen keyboard to be clicked
keyBoard.addEventListener( 'click', (e) => {
    const letterBtn = event.target;
    if ( letterBtn.tagName === 'BUTTON' && letterBtn.className !== 'chosen' ) {
        letterBtn.className += ' chosen';
        letterBtn.disabled = true;
    }

    // matches letter to keyboard button pressed
    const letterFound = checkLetter(letterBtn);

    // keeps track of tries remaining
    if ( !letterFound && letterBtn.tagName === 'BUTTON' ) {
        missed++;
        hearts[missed - 1].style.opacity = '0.25';
    }
    
    checkWin();
});

// resets hearts
function resetHearts() {
    missed = 0;
    for ( let i = 0; i < hearts.length; i++ ) {
        hearts[i].style.opacity = '1';
        scoreboard.style.display = '';
    }
}

// resets keyboard
function resetKeyboard() {
    const chosen = document.querySelectorAll('.chosen');
    for ( let i = 0; i < chosen.length; i++ ) {
        chosen[i].className = '';
        chosen[i].disabled = false;
    }
}

// resets random phrase
function resetPhrase() {
    phraseUL.innerHTML = '';
    addPhraseToDisplay( getRandomPhraseAsArray( phrases ) )
}

// resets the game
function resetGame() {
    resetKeyboard();
    resetHearts();
    resetPhrase();
    overlay.style.display = 'none';
}

// Listen for the start / reset game button to be pressed
startBtn.addEventListener( 'click', (e) => {
    e.preventDefault();
    overlay.style.display = 'none';
    resetGame();
});