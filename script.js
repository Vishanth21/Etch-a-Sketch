ACTIVECOLOR = '#CCFF00';

let penColor = '#ffa200ff',backgroundColor = '#FFFFFF', penActive = false, rainbowMode = false;

const board = document.querySelector('.board');
for(let i = 0;i < 256; i++) {
    const grid = document.createElement('div');
    grid.className = 'grid';
    grid.id = 'g' + i;
    grid.style.backgroundColor = backgroundColor;
    board.appendChild(grid);
}

const pen = document.querySelector('.pen input');
const background = document.querySelector('.background input');

pen.addEventListener("input", () => penColor = pen.value);
background.addEventListener("input", () => backgroundColor = background.value);

const togglePenBtn = document.querySelector('.switch');
togglePenBtn.addEventListener('click',function () {
    penActive = !penActive;
    penActive ? togglePenBtn.style.backgroundColor = ACTIVECOLOR : togglePenBtn.style.backgroundColor = null;
})

const rainbowModeBtn = document.querySelector('.rainbow')
rainbowModeBtn.addEventListener('click', function () {
    rainbowMode = !rainbowMode;
    rainbowMode ? rainbowModeBtn.style.backgroundColor = ACTIVECOLOR : rainbowModeBtn.style.backgroundColor = null;

})

board.addEventListener("mouseover", function (event) {
    if(penActive) {
        if(rainbowMode) {
            pen.value = randomColor();
            penColor = pen.value;
            pen.setAttribute('data-current-color',penColor);
        }
        event.target.style.backgroundColor = penColor;
    }
    
})

function randomColor() {
    let hex = Math.floor(Math.random() * 16777215);
    hex = hex.toString(16);
    hex = hex.padStart(6,'0');
    return '#' + hex;
}