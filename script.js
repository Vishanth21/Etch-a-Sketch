const board = document.querySelector('.board');
for(let i = 0;i < 256; i++) {
    const grid = document.createElement('div');
    grid.className = 'grid';
    board.appendChild(grid);
}