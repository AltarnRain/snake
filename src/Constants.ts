/**
 * Constants used in the game.
 */

/**
 * Number of rows in the game grid
 */
export const GameRows = 31;

/**
 * Number of columns in the game grid.
 */
export const GameColumns = 31;

/**
 * Player start position on the X axis
 */
export const PlayerStartCoordinateX = Math.ceil(GameRows / 2);

/**
 * Player start position on the Y axis
 */
export const PlayerStartCoordinateY = Math.ceil(GameColumns / 2);

/**
 * The length of the snake at the start of the game.
 */
export const StartingSnakeLength = 5;

/**
 * A constant value to calculate the best fitting CellWidth and Height.
 */
export const ResizeFactor = 0.027;

/**
 * Cell width.
 */
export const CellWidthAndHeight = window.screen.height * ResizeFactor;

/**
 * Offset where to position cells on the X axis.
 */
export const screenXOffset = (window.innerWidth / 2) - (CellWidthAndHeight * PlayerStartCoordinateX);

/**
 * Offset where to postion cells on the Y axis.
 */
export const screenYOffset = (window.innerHeight / 2) - (CellWidthAndHeight * PlayerStartCoordinateY);

/**
 * The number of milisecond between gameticks
 */
export const TimeTick = 100;

export const DebugOptions = {
    manualMovement: false,
};
