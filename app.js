
// Hide start screen overlay
const startBtn = document.querySelector( '.btn__reset' );
const overlay = document.getElementById( 'overlay' );
startBtn.addEventListener( 'click', (e) => {
    e.preventDefault();
    overlay.style.display = 'none';
});

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
        console.log(listItem);
        if ( listItem.textContent !== ' ' ) {
            listItem.className = 'letter';
        }
        phraseUL.appendChild(listItem);
    }
}

addPhraseToDisplay(phraseArray);