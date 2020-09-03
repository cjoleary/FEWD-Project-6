
// Variables
const keyBoard = document.querySelector( '#qwerty' );
const phrase = document.querySelector( '#phrase' );
let missed = 0;
const phrases = [ 'basketball', 'baseball', 'football', 'hockey', 'soccer' ];


// Hide start screen overlay
const startBtn = document.querySelector( '.btn__reset' );
const overlay = document.getElementById( 'overlay' );
startBtn.addEventListener( 'click', (e) => {
    e.preventDefault();
    overlay.style.display = 'none';
});