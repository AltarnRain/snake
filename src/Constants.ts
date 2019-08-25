/**
 * Constants used in the game.
 */

/**
 * Number of rows in the game grid
 */
export const GameRows = 51;

/**
 * Number of columns in the game grid.
 */
export const GameColumns = 51;

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
export const StartingSnakeLength = 3;

/**
 * Cell width.
 */
export const CellWidth  = 15;

/**
 * Cell height
 */
export const CellHeight = 15;

/**
 * Offset where to position cells on the X axis.
 */
export const screenXOffset = (window.screen.availWidth / 2) - (CellWidth * PlayerStartCoordinateX);

/**
 * Offset where to postion cells on the Y axis.
 */
export const screenYOffset = (window.screen.availHeight / 2) - (CellHeight * PlayerStartCoordinateY);

export const DebugOptions = {
    manualMovement: false,
};
