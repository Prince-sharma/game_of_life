# Game Of Live
The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.[1] It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves. It is Turing complete and can simulate a universal constructor or any other Turing machine.

#### Rules 
The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, live or dead, (or populated and unpopulated, respectively). Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

- Any live cell with fewer than two live neighbours dies, as if by underpopulation.
- Any live cell with two or three live neighbours lives on to the next generation.
- Any live cell with more than three live neighbours dies, as if by overpopulation.
- Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

#### Live Demo at -> https://prince-sharma.github.io/game_of_life/

## Approach :
basically we have to update the given board's cell values according to the 4 rules of game of life. One important thing to note is, we always have to consider the original board's values, while updating a cell's value.

One way to solve this problem would be to simply create a copy of the 2D board, so that we never loose track of the original cell values, and we will be updating the cell values in the original given board, but we will be applying the rules on the clone board's values.

### Implementation 1 :
- Time => O(rows x cols)
- Space => O(rows * cols)

```javascript
function draw() {
  background(0);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        fill(255);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }

  let next = make2DArray(cols, rows);

  // Compute next based on grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      // Count live neighbors!
      let neighbors = countNeighbors(grid, i, j);

      if (state == 0 && neighbors == 3) {
        next[i][j] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }

  grid = next;
}

```
### Implementation 2 :
- Time => O(rows x cols)
- Space => O(1)

The state change happens only in two cases :
1. A live cell dies because of under-population or over-population, so state changes from 1 to 0 (1 -> 0)
2. A dead cell becomes alive, if it have exactly three live neighbors, so state changes from 0 to 1 (0 -> 1)

We can update the board as long as we don't loose the original cell value `grid[row][column]`. 
So how can we do that. How can we update the board's cell value, while at the same time 
we should be able to figure out what was the original value at `grid[row][column]`

If the state change happens because of first case, we will set the board's cell value to 2. 
So when we see a cell value of -1 we know that this cell was initially alive but later died.

If the state change happens because of second case, we will set the board's cell value to -1. 
So when we see a cell value of 2 we know that this cell was initially dead but later became alive.

And lastly we update the cell values so that -1 becomes 1 and 2 becomes 0.

```javascript

function draw() {
  background(0);  // 0

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        fill(20, 148, 20);   // 20, 148, 20 
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

```


