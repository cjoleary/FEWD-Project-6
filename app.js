
// Global Variables
const keyBoard = document.querySelector( '#qwerty' );
const phraseUL = document.querySelector( '#phrase' );
const startBtn = document.querySelector( '.btn__reset' );
const overlay = document.getElementById( 'overlay' );
const title = document.querySelector( '.title' );
const scoreboard = document.querySelector('#scoreboard')
let missed = 0;
const phrases = [
    'A BLESSING IN DISGUISE',
    'A DIME A DOZEN',
    'ONCE IN A BLUE MOON', 
    'EVERY DOG HAS HIS DAY', 
    'IT TAKES TWO TO TANGO'
];

// Listen for the start game button to be pressed
startBtn.addEventListener( 'click', (e) => {
    e.preventDefault();
    overlay.style.display = 'none';
});

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
        if ( listItem.textContent !== ' ' ) {
            listItem.className = 'letter';
        } else {
            listItem.className = 'space';
        }
        phraseUL.appendChild(listItem);
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
        title.textContent = "You've Won the Game!";
        scoreboard.style.display = 'none';
    } else if ( missed >= 5 ) {
        overlay.className += ' lose';
        overlay.style.display = 'flex';
        title.textContent = "You've Lost the Game :(";
        scoreboard.style.display = 'none';
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
        const hearts = document.querySelectorAll('.tries')
        hearts[missed - 1].style.opacity = '0.25';
    }
    
    checkWin();
});