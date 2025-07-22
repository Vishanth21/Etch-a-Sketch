const ACTIVECOLOR = '#CCFF00';
const SMALL = 16;
const MEDIUM = 32;
const LARGE = 64;
let penColor = '#ffa200ff',backgroundColor = '#FFFFFF',inactiveGrids = SMALL**2,gridSize = SMALL;
let penActive = false, rainbowMode = false,eraserActive=false,shadeActive=false,fadeActive=false,sizeBtn = false;
const size = document.querySelector('.grid-size');
document.querySelector('.small').style.backgroundColor = ACTIVECOLOR;
size.addEventListener('click',function(event) {
    switch(event.target.className) {
        case 'small':
            gridSize = SMALL;
            event.target.style.backgroundColor = ACTIVECOLOR;
            document.querySelector('.medium').style.backgroundColor = '';
            document.querySelector('.large').style.backgroundColor = '';
            break;
        case 'medium':
            gridSize = MEDIUM;
            event.target.style.backgroundColor = ACTIVECOLOR;
            document.querySelector('.small').style.backgroundColor = '';
            document.querySelector('.large').style.backgroundColor = '';
            break;
        case 'large':
            gridSize = LARGE;
            event.target.style.backgroundColor = ACTIVECOLOR;
            document.querySelector('.medium').style.backgroundColor = '';
            document.querySelector('.small').style.backgroundColor = '';
            break;
    }
    inactiveGrids = gridSize ** 2;
    buildGrid();
})

const board = document.querySelector('.board');
board.style.backgroundColor = backgroundColor;
buildGrid();
function buildGrid() {
    while(board.firstChild) {
        board.removeChild(board.lastChild);
    }
    for(let i = 0;i < inactiveGrids; i++) {
        const grid = document.createElement('div');
        grid.classList.add('grid','inactive');
        grid.id = 'g' + i;
        grid.style.opacity = 0.5;
        grid.style.width = `${100/gridSize}%`;
        grid.style.height = grid.style.width;
        board.appendChild(grid);
    }
}

const pen = document.querySelector('.pen input');
const background = document.querySelector('.background input');
pen.addEventListener("input", () => penColor = pen.value);
background.addEventListener("input", changeBackground);

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
    if(!event.target.classList.contains('board')) {
        if(eraserActive) {
            if(event.target.classList.contains('active')) {
                inactiveGrids++;
                event.target.classList.replace('active','inactive');
            }
            event.target.style.backgroundColor = '';
            event.target.style.opacity = 0.5;

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
            event.target.style.backgroundColor = penColor;
        }
        if(shadeActive || fadeActive) {
            if(shadeActive)
                event.target.style.opacity = (event.target.style.opacity*10 + 1)/10;  
            if(fadeActive)
                event.target.style.opacity = (event.target.style.opacity*10 - 1)/10;           
        }
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
    for(let i = 0;i < gridSize**2-inactiveGrids; i++) {
        grids[i].classList.replace('active','inactive');
        grids[i].style.backgroundColor = '';
        grids[i].style.opacity = 0.5;
    }
    inactiveGrids = gridSize**2;
}

document.querySelector('.clear').addEventListener('click',clearAll);

const shade = document.querySelector('.shade');
shade.addEventListener('click',function() {
    shadeActive = !shadeActive;
    shadeActive ? shade.style.backgroundColor = ACTIVECOLOR : shade.style.backgroundColor = null;
})

const fade = document.querySelector('.fade');
fade.addEventListener('click',function() {
    fadeActive = !fadeActive;
    fadeActive ? fade.style.backgroundColor = ACTIVECOLOR : fade.style.backgroundColor = null;
})