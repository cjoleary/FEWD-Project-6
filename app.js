
// Variables
const keyBoard = document.querySelector( '#qwerty' );
const phraseUL = document.querySelector( '#phrase' );
let missed = 0;
const phrases = [
    'A BLESSING IN DISGUISE',
    'A DIME A DOZEN',
    'ONCE IN A BLUE MOON', 
    'EVERY DOG HAS HIS DAY', 
    'IT TAKES TWO TO TANGO'
];

// Hide start screen overlay
const startBtn = document.querySelector( '.btn__reset' );
const overlay = document.getElementById( 'overlay' );
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

// Loops through array of characters and appends them to the #phrase ul
function addPhraseToDisplay( arr ) {
    for ( let i = 0; i < arr.length; i++ ) {
        const listItem = document.createElement('li');
        listItem.textContent = arr[i];
        if ( listItem.textContent !== ' ' ) {
            listItem.className = 'letter';
        }
        phraseUL.appendChild(listItem);
    }
}

addPhraseToDisplay(phraseArray);

// checks to see if phrase letters match the keyboard btn the player clicks
function checkLetter( button ) {
    const letter = document.getElementsByClassName('letter')
    let match = null;
    for ( let i = 0; i < letter.length; i++ ) {
        if ( button.textContent === letter[i].textContent.toLowerCase() ) {
            letter[i].className += ' show';
            match = letter[i].textContent;
            console.log(match);
        }
    }
    return match;
}

// keyboard event listener
keyBoard.addEventListener( 'click', (e) => {
    const letterBtn = event.target;
    letterBtn.className += ' chosen';
    letterBtn.disabled = true;

    // matches letter to keyboard button pressed
    const letterFound = checkLetter(letterBtn);
    if ( !letterFound ) {
        missed++;
        const hearts = document.querySelectorAll('img')
        hearts[missed - 1].style.opacity = '0.25';
    }
});