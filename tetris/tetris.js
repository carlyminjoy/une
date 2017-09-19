"use strict";

// Global configuration
var rows = 20;
var cols = 10;
var cellSize = 30;
var interval = 400;
var backgroundColour = "#f2f2f2";

/** "Enum" for representing colours. */
var Colour = {Red: "red", Magenta: "magenta", Gold: "gold", Cyan: "cyan", Blue: "blue", Orange: "orange", Green: "green"};

/**
 * Represents a position, i.e. a row-column pair.
 * @constructor
 */
var Position = function (row, col) {
    this.row = row;
    this.col = col;
};

Position.prototype.clone = function () {
    return new Position(this.row, this.col);
};

Position.prototype.add = function (other) {
    return new Position(this.row + other.row, this.col + other.col);
};

Position.prototype.moveLeft = function () {
    return new Position(this.row, this.col -1);
};

Position.prototype.moveRight = function () {
    return new Position(this.row, this.col +1);
};

Position.prototype.moveUp = function () {
    return new Position(this.row -1, this.col);
};

Position.prototype.moveDown = function () {
    return new Position(this.row + 1, this.col);
};

/**
 * Returns an array of nulls.
 * @param {Number} length - The length of the returned array.
 */
var nullArray = function (length) {
    var output = [];
    while (output.length < length) {
        output.push(null);
    }

    return output;
};

/**
 * Returns a grid of nulls.
 * @param {Number} rows - The number of rows in the returned grid.
 * @param {Number} cols - The number of cols in the returned grid.
 */
var nullGrid = function (rows, cols) {
    var output = [];
    while (output.length < rows) {
        output.push(nullArray(cols));
    }

    return output;
};

/** Clones, i.e. performs a deep copy on, a grid. */
var gridClone = function (grid) {
    var cloned = [];
    var row;

    // Iterate through each cell in grid and
    // create and push a copy to cloned grid
    for (var i = 0; i < grid.length; i++) {
        row = [];
        for (var j = 0; j < grid[i].length; j++) {
            row.push(grid[i][j]);
        }
        cloned.push(row);
    }

    return cloned;
};

/**
 * Returns an array of the Positions in a grid corresponding to the
 * elements that are == true.
 *
 * @example truthyCoords([[0, 1, 0],
 *                        [0, 1, 0],
 *                        [1, 1, 0]])
 *              = [ Position { row: 0, col: 1 },
 *                  Position { row: 1, col: 1 },
 *                  Position { row: 2, col: 0 },
 *                  Position { row: 2, col: 1 } ]
 */
var truthyCoords = function (grid) {
    var row, col, output = [];

    // Iterate through each cell in grid and
    // create and push a new position to output
    for (row = 0; row < grid.length; row++) {
        for (col = 0; col < grid[row].length; col++) {
            if (grid[row][col]) {
                output.push(new Position(row, col));
            }
        }
    }
    // Return all truthy positions
    return output;
};

/**
 * Rotates a grid clockwise.
 *
 * @example rotateCW([[0, 1, 0],
 *                    [0, 1, 0],
 *                    [1, 1, 0]])
 *              = [[ 1, 0, 0 ],
 *                 [ 1, 1, 1 ],
 *                 [ 0, 0, 0 ]]
 */
var rotateCW = function (grid) {
    var rotated = [];

    // For each cell in grid
    for (var r in grid) {
        for (var c in grid[r]) {
            // c acts as required col in rotated grid.
            // If row (c) has already been created,
            // add cell to beginning of the row
            if (rotated[c]) {
                rotated[c].unshift(grid[r][c]);
            // If row(c) hasn't been created,
            // add row and col to the end of grid
            } else {
                rotated.push([grid[r][c]]);
            }
        }
    }
    return rotated;
};

/**
 * Returns the smallest column values out of all the truthy elements
 * in a grid.
 *
 * @example leftMostTruthyCol([[0, 0, 1, 0],
 *                             [0, 0, 1, 0],
 *                             [0, 0, 1, 0],
 *                             [0, 0, 1, 0]]) = 2
 */
var leftMostTruthyCol = function (grid) {
    var i, smallestCol = null;
    var coords = truthyCoords(grid);

    // iterates through truthy positions in grid
    // and assigns the value of the smallest column
    // to smallestCol
    for (i = 0; i < coords.length; i++) {
        if (smallestCol === null || coords[i].col < smallestCol) {
            smallestCol = coords[i].col;
        }
    }
    return smallestCol;
};

/**
 * Returns the larget column values out of all the truthy elements
 * in a grid.
 *
 * @example rightMostTruthyCol([[0, 1, 0],
 *                              [0, 1, 0],
 *                              [1, 1, 0]]) = 1
 */
var rightMostTruthyCol = function (grid) {
    var i, largestCol = null;
    var coords = truthyCoords(grid);
    for (i = 0; i < coords.length; i++) {
        if (largestCol === null || coords[i].col > largestCol) {
            largestCol = coords[i].col;
        }
    }
    return largestCol;
};

/**
 * Returns the larget row values out of all the truthy elements
 * in a grid.
 *
 * @example bottomMostTruthyCol([[0, 1, 1],
 *                               [1, 1, 0],
 *                               [0, 0, 0]] = 1
 */
var bottomMostTruthyRow = function (grid) {
    var i, largestRow = null;
    var coords = truthyCoords(grid);
    for (i = 0; i < coords.length; i++) {
        if (largestRow === null || coords[i].row > largestRow) {
            largestRow = coords[i].row;
        }
    }
    return largestRow;
};

/**
 * Returns the smallest row values out of all the truthy elements
 * in a grid.
 *
 * @example topMostTruthyCol([[0, 0, 0],
 *                            [1, 1, 1],
 *                            [0, 1, 0]] = 1
 */
var topMostTruthyRow = function (grid) {
    var i, smallestRow = null;
    var coords = truthyCoords(grid);
    for (i = 0; i < coords.length; i++) {
        if (smallestRow === null || coords[i].row < smallestRow) {
            smallestRow = coords[i].row;
        }
    }
    return smallestRow;
};

/**
 * Represents a tetromino.
 * @constructor
 * @param {Grid} shape - A grid of ones and zeroes, where the ones represent
 *                where the blocks of the tetromino are.
 * @param {Colour} colour - The colour of the tetromino.
 */
var Tetromino = function (shape, colour) {
    this.shape = shape;
    this.colour = colour;
};

Tetromino.prototype.clone = function () {
    return new Tetromino(gridClone(this.shape), this.colour);
};

Tetromino.prototype.rotateCW = function () {
    return new Tetromino(rotateCW(this.shape), this.colour);
};

// The tetrominos.
var I = new Tetromino(
    [   [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0]],
    Colour.Red);

var J = new Tetromino(
    [   [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0]],
    Colour.Magenta);

var L = new Tetromino(
    [   [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1]],
    Colour.Gold);

var O = new Tetromino(
    [   [1, 1],
        [1, 1]],
    Colour.Cyan);

var S = new Tetromino(
    [   [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]],
    Colour.Blue);

var T = new Tetromino(
    [   [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]],
    Colour.Orange);

var Z = new Tetromino(
    [   [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]],
    Colour.Green);

/**
 * Represents the active tetromino on our game.
 *
 * The active tetromino is the one that is currently under the control
 * of the player.
 * @constructor
 * @param {Tetromino} tetromino - The tetromino.
 * @param {Position} topLeft - The position of the top left cell of
 *                             the tetromino.
 */
var ActiveTetromino = function (tetromino, topLeft) {
    this.tetromino = tetromino;
    this.topLeft = topLeft;
};

ActiveTetromino.prototype.clone = function () {
    return new ActiveTetromino(this.tetromino.clone(), this.topLeft.clone());
};

ActiveTetromino.prototype.moveLeft = function () {
    return new ActiveTetromino(this.tetromino, this.topLeft.moveLeft());
};

ActiveTetromino.prototype.moveRight = function () {
    return new ActiveTetromino(this.tetromino, this.topLeft.moveRight());
};

ActiveTetromino.prototype.moveUp = function () {
    return new ActiveTetromino(this.tetromino, this.topLeft.moveUp());
};

ActiveTetromino.prototype.moveDown = function () {
    return new ActiveTetromino(this.tetromino, this.topLeft.moveDown());
};

ActiveTetromino.prototype.rotateCW = function () {
    return new ActiveTetromino(this.tetromino.rotateCW(), this.topLeft);
};

/**
 * Returns whether or not the active tetromino is fully visible to the
 * player.
 *
 * Note that the active tetromino starts with a negative top row, so
 * that it is initial totally hidden from the player.
 */

ActiveTetromino.prototype.isFullyVisible = function() {
    // get all truthy positions of tetromino & top left position
    var tet       = this.tetromino.shape;
    var gridPos   = this.topLeft;

    // Find positions of all truthy sides of the tetromino shape
    var topRow    = gridPos.row + topMostTruthyRow(tet);
    var bottomRow = gridPos.row + bottomMostTruthyRow(tet);
    var leftCol   = gridPos.col + leftMostTruthyCol(tet);
    var rightCol  = gridPos.col + rightMostTruthyCol(tet);

    // Returns false if any positions are outside the grid
    if (  topRow    > 19 ||
          bottomRow < 0  ||
          leftCol   < 0  ||
          rightCol  > 9  ) { return false; }

    // Returns true if all positions are within the grid
    return true;
};

/**
 * Represents a model of the entire state of our game.
 * @constructor
 * @param {Grid} grid - Represents the "background" grid of the game.
 *                      This is where the tetrominos go when they
 *                      become inactive. This values in the grid are
 *                      either a Colour or null.
 * @param {ActiveTetromino} active - The current active tetromino.
 *                                   Note that this can be null,
 *                                   meaning that there is currently
 *                                   no active tetromino.
 * @param {Bool} gameOver - Is the game over?
 */
var Model = function (grid, active, gameOver) {
    this.grid = grid;
    this.active = active;
    this.gameOver = gameOver;
};

Model.prototype.clone = function () {
    if (this.active === null) {
        return new Model(gridClone(this.grid), null, this.gameOver);
    } else {
        return new Model(gridClone(this.grid), this.active.clone(), this.gameOver);
    }
};

/**
 * Returns the difference between two models.
 *
 * This is used in the rendering code so that we don't waste resources
 * updating everything, but only what has changed.
 */
Model.prototype.diff = function (oldModel) {
    var row, col;
    var old = oldModel.clone();
    var current = this.clone();
    old.activeToGrid();
    current.activeToGrid();
    var diff = {
        gameOver: current.gameOver != old.gameOver,
        grid: []
    };

    for (row = 0; row < rows; row++) {
        for (col = 0; col < cols; col++) {
            if (current.grid[row][col] !== old.grid[row][col]) {
                diff.grid.push({
                    position: new Position(row, col),
                    value: current.grid[row][col]
                });
            }
        }
    }

    return diff;
};

Model.prototype.moveLeft = function () {
    return new Model(this.grid, this.active.moveLeft(), this.gameOver);
};

Model.prototype.moveRight = function () {
    return new Model(this.grid, this.active.moveRight(), this.gameOver);
};

Model.prototype.moveUp = function () {
    return new Model(this.grid, this.active.moveUp(), this.gameOver);
};

Model.prototype.moveDown = function () {
    return new Model(this.grid, this.active.moveDown(), this.gameOver);
};

Model.prototype.rotateCW = function () {
    return new Model(this.grid, this.active.rotateCW(), this.gameOver);
};

/**
 * Returns whether the active tetromino collides/overlaps with any
 * non-null values in grid, or whether the active tetromino has cells
 * that appear outside of the grid.
 */
Model.prototype.hasCollisions = function (tet) {
    var tetCoords = truthyCoords(tet.tetromino.shape);
    var gridPos   = tet.topLeft;

    // Iterates through every cell in tetromino
    // and makes sure it doesn't appear outside the gridPos
    // and doesn't overlap with existing non-null cells
    for (var pos in tetCoords) {
        var cell = gridPos.add(tetCoords[pos]);
        if (
            cell.row > 19 ||
            cell.col < 0  ||
            cell.col > 9  ||
            (cell.row >= 0 && this.grid[cell.row][cell.col])
        ) { return true; }
    }
    return false;
};

/**
 * Moves the active tetromino to the "background" grid.
 *
 * If this.active === null then does nothing.
 */
Model.prototype.activeToGrid = function () {
    if (this.active !== null) {
        var tetCoords = truthyCoords(this.active.tetromino.shape);
        var gridPos = this.active.topLeft;
        var color = this.active.tetromino.colour;

        // iterates through all truthy positions of active tetromino
        // and changes color of active cell in background grid
        for (var pos in tetCoords) {
            var cell = gridPos.add(tetCoords[pos]);
            // makes sure the cell has come into vision
            // from the top of the screen
            if (cell.row >= 0) {
                this.grid[cell.row][cell.col] = color;
            }
        }
        this.active = null;
    }
};

/**
 * Removes complete rows from the "background" grid.
 *
 * Complete lines are rows which contain no nulls. Rows above the
 * removed rows are moved down.
 */

Model.prototype.clearLines = function () {
    // iterates through each cell in grid
    // and if every cell in the row is not null,
    // changes the variable full to true
    for (var r in this.grid) {
        var full = true;
        for (var c in this.grid[r]) {
            if (!this.grid[r][c]) { full = false; }
        }
        // if the row is full, iterates through each cell
        // in that row and changes it to null
        if (full) {
            for (var e in this.grid[r]) {
                this.grid[r][e] = null;
            }
            // Moves all the upper rows in the grid down
            while (r > 0) {
                this.grid[r] = this.grid[r-1];
                r--;
            }
        }
    }
};

/** An array of all the posible active tetrominos we can generate. */
var tetrominoChoices = (function () {
    var i, j, tetrominos, rotatedTetrominos, tetromino, top, minLeft, maxLeft, left, choices;
    tetrominos = [I, J, L, O, S, T, Z];

    // Collect not just the original tetrominos, but rotated copies of them.
    rotatedTetrominos = [];
    for (i = 0; i < tetrominos.length; i++) {
        tetromino = tetrominos[i];
        for (j = 0; j < 4; j++) {
            rotatedTetrominos.push(tetromino);
            tetromino = tetromino.rotateCW();
        }
    }

    // Collect all the choices by examing where we can place these
    // tetrominos.
    choices = [];
    for (i = 0; i < rotatedTetrominos.length; i++) {
        tetromino = rotatedTetrominos[i];
        top = -(bottomMostTruthyRow(tetromino.shape) + 1);
        minLeft = -leftMostTruthyCol(tetromino.shape);
        maxLeft = cols - (rightMostTruthyCol(tetromino.shape) + 1);
        for (left = minLeft; left <= maxLeft; left++) {
            choices.push(new ActiveTetromino(tetromino, new Position(top, left)));
        }
    }

    return choices;
})();

/**
 * "Enum" of actions we can perform on the model.
 *
 * Note that the Tick action gets called every `interval` milliseconds.
 */
var Action = {
    Tick: "tick",
    GenTetromino: "genTetromino",
    Down: "down",
    Left: "left",
    Right: "right",
    Rotate: "rotate"
};

/** Update the model after performing an Action upon it. */
Model.prototype.update = function (action) {
    var next;
    if (this.gameOver) return;

    if (action === Action.Tick) {
        this.update(Action.Down);
        this.update(Action.GenTetromino);
    } else if (action === Action.GenTetromino) {
        if (this.active === null) {
            this.active = tetrominoChoices[Math.floor(Math.random()*tetrominoChoices.length)];
        }
    } else if (action === Action.Down) {
        // TODO If this.active is not null attempt to move it down. If
        // it cannot be moved down, and it is currently not fully
        // visible then the game is over. If it is fully visible, but
        // cannot be moved down, then move the active to the grid, and
        // clear lines.
        if (this.active !== null) {
            next = this.active.moveDown();
            if (!this.hasCollisions(next)) {
                this.active = next;
            } else if (this.active.isFullyVisible()) {
                this.activeToGrid();
                this.clearLines();
            } else {
                this.gameOver = true;
            }
        }
    } else if (action === Action.Left) {
        if (this.active !== null) {
            next = this.active.moveLeft();
            if (!this.hasCollisions(next)){
                this.active = next;
            }
        }
    } else if (action === Action.Right) {
        if (this.active !== null) {
            next = this.active.moveRight();
            if (!this.hasCollisions(next)){
                this.active = next;
            }
        }
    } else if (action === Action.Rotate) {
        // TODO If this.active is not null attempt to rotate it
        // clockwise. If this fails, then try wall kicks, i.e.
        // try to rotate it AND move it one left, also try to rotate it
        // AND move it one right.
        if (this.active !== null) {
            next = this.active.rotateCW();
            if(!this.hasCollisions(next)){
                this.active = next;
            } else {
                next = this.active.moveLeft();
                next = next.rotateCW();
                if(!this.hasCollisions(next)){
                    this.active = next;
                } else {
                    next = this.active.moveRight();
                    next = next.rotateCW();
                    if(!this.hasCollisions(next)){
                        this.active = next;
                    }
                }
            }
        }
    }
};

/** The entry-point for our Tetris app. */
// eslint-disable-next-line no-unused-vars
var tetrisMain = function () {
    var model;

    // Initialize the model.
    model = new Model(nullGrid(rows, cols), null, false);
    model.update(Action.GenTetromino);

    // Function that takes a model and renders it to the screen.
    // Initialises the DOM within a lexical closure. Keeps a copy of
    // the previous model, and uses Model.prototype.diff, so that we
    // only change what needs to be changed in the DOM.
    var render = (function () {
        var row, col;
        var $gameOver, $grid, $cell, $cells, $tetrisapp;
        var oldModel = model.clone();

        $gameOver = $("<div></div>", {id: "gameover"});
        $gameOver.html("GAME OVER");
        $gameOver.css("fontFamily", "Arial, sans-serif");
        $gameOver.css("textAlign", "center");
        $gameOver.css("fontSize", "3em");
        $gameOver.css("fontWeight", "bold");
        $gameOver.css("color", "crimson");
        $gameOver.css("width", (cols*cellSize) + "px");
        $gameOver.css("position", "absolute");
        $gameOver.css("left", "0");
        $gameOver.css("top", (0.4*rows*cellSize) + "px");
        $gameOver.css("display", "none");

        $grid = $("<div></div>", {id: "grid"});
        $grid.css("width", (cols*cellSize) + "px");
        $grid.css("height", (rows*cellSize) + "px");
        $cells = nullGrid(rows, cols);
        for (row = 0; row < rows; row++) {
            for (col = 0; col < cols; col++) {
                $cell = $("<div></div>");
                $cell.css("backgroundColor", backgroundColour);
                $cell.css("width", cellSize + "px");
                $cell.css("height", cellSize + "px");
                $cell.css("float", "left");
                $grid.append($cell);
                $cells[row][col] = $cell;
            }
        }

        // Add it to #tetrisapp
        $tetrisapp = $("#tetrisapp");
        $tetrisapp.css("position", "relative");
        $tetrisapp.css("margin", "20px auto");
        $tetrisapp.css("width", (cols*cellSize) + "px");
        $tetrisapp.append($grid);
        $tetrisapp.append($gameOver);

        return function (model) {
            var i, row, col, colour;
            var currentModel = model.clone();
            var diff = currentModel.diff(oldModel);
            for (i = 0; i < diff.grid.length; i++) {
                row = diff.grid[i].position.row;
                col = diff.grid[i].position.col;
                if (diff.grid[i].value === null) {
                    colour = backgroundColour;
                } else {
                    colour = diff.grid[i].value;
                }

                $cells[row][col].css("backgroundColor", colour);
            }

            if (diff.gameOver) {
                $grid.css("opacity", "0.15");
                $gameOver.css("display", "block");
            }

            oldModel = currentModel;
        };
    })();

    // This is the actual "runtime" code.
    var onTimer = function () {
        model.update(Action.Tick);
        if (!model.gameOver) {
            setTimeout(onTimer, interval);
        }
        render(model);
    };

    setTimeout(onTimer, interval);

    $(document).on("keydown", function (e) {
        if (!model.gameOver) {
            if (e.which === 65) { // "a"
                model.update(Action.Left);
                render(model);
            } else if (e.which === 83) { // "s"
                model.update(Action.Down);
                render(model);
            } else if (e.which === 68) { // "d"
                model.update(Action.Right);
                render(model);
            } else if (e.which === 32) { // " "
                model.update(Action.Rotate);
                render(model);
            }
        }
    });
};
