const ACTIVECOLOR = '#CCFF00';

let penColor = '#ffa200ff',backgroundColor = '#FFFFFF', penActive = false, rainbowMode = false,inactiveGrids = 256,eraserActive=false;

const board = document.querySelector('.board');
for(let i = 0;i < 256; i++) {
    const grid = document.createElement('div');
    grid.classList.add('grid','inactive');
    grid.id = 'g' + i;
    board.appendChild(grid);
}

const pen = document.querySelector('.pen input');
const background = document.querySelector('.background input');
pen.addEventListener("input", () => penColor = pen.value);
background.addEventListener("input", changeBackground);
changeBackground();

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

const eraser = document.querySelector('.eraser');
eraser.addEventListener('click', function() {
    eraserActive = !eraserActive;
    eraserActive ? eraser.style.backgroundColor = ACTIVECOLOR : eraser.style.backgroundColor = null;
} )

board.addEventListener("mouseover", function (event) {
    if(eraserActive) {
        if(event.target.classList.contains('active')) {
            inactiveGrids++;
            event.target.classList.replace('active','inactive');
        }
        if(!event.target.classList.contains('board'))
            event.target.style.backgroundColor = '';

    }
    else if(penActive) {
        if(event.target.classList.contains('inactive')) {
            inactiveGrids--;
            event.target.classList.replace('inactive','active');
        }

        if(rainbowMode) {
            pen.value = randomColor();
            penColor = pen.value;
        }
        if(!event.target.classList.contains('board'))
            event.target.style.backgroundColor = penColor;
    }
})

function randomColor() {
    let hex = Math.floor(Math.random() * 16777215);
    hex = hex.toString(16);
    hex = hex.padStart(6,'0');
    return '#' + hex;
}

function changeBackground() {
    backgroundColor = background.value;
    board.style.backgroundColor = backgroundColor;
    }

function clearAll() {
    const grids = Array.from(document.getElementsByClassName('grid active'));
    for(let i = 0;i < 256-inactiveGrids; i++) {
        grids[i].classList.replace('active','inactive');
        grids[i].style.backgroundColor = '';
    }
    inactiveGrids = 256;
}

document.querySelector('.clear').addEventListener('click',clearAll);