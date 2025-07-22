ACTIVECOLOR = '#CCFF00';

let penColor = '#ffa200ff',backgroundColor = '#FFFFFF', penActive = false;

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

const togglePen = document.querySelector('.switch');
togglePen.addEventListener('click',function () {
    penActive = !penActive;
    penActive ? togglePen.style.backgroundColor = ACTIVECOLOR : togglePen.style.backgroundColor = null;
})

board.addEventListener("mouseover", function (event) {
    if(penActive) {
    event.target.style.backgroundColor = penColor;
    }
    
})