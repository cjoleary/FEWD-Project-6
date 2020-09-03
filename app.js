
// Hide start screen overlay
const startBtn = document.querySelector( '.btn__reset' );
const overlay = document.getElementById( 'overlay' );
console.log(startBtn);
console.log(overlay);
startBtn.addEventListener( 'click', (e) => {
    e.preventDefault();
    overlay.style.display = 'none';
});