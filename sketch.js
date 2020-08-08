// Prince Sharma
// https://prince-sharma.github.io
// find the live demo at 
// https://prince-sharma.github.io/game_of_life/ 

// Game of Life 
// Time -> O(m*n) Space -> O(1)
// made using p5.js 

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let cols;
let rows;
let resolution = 10;

function setup() {
  createCanvas(700, 400);    // full screen size 1890, 940
  cols = width / resolution;
  rows = height / resolution;

  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
}

function draw() {
  background(0);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        fill(20, 148, 20);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }


  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      // Count live neighbors!
      let neighbors = countNeighbors(grid, i, j);

      if (state == 0 && neighbors == 3) {
        grid[i][j] = -1;
      }
      
      if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        grid[i][j] = 2;
      }
    }
  }

  for ( let i = 0 ; i < cols ; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j] == -1 ) {
        grid[i][j] = 1 ;
      } 

      if (grid[i][j] == 2) {
        grid[i][j] = 0;
      }
    }
  }
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if ( !(i == 0 && j == 0) ) {
        let col = (x + i + cols) % cols;
        let row = (y + j + rows) % rows;
        if ( grid[col][row] == 1 || grid[col][row] == 2 ) {
          sum += 1;
        }
      }
    }
  } 
  return sum;
}
