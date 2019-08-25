/**
 * Constants used in the game.
 */

/**
 * Number of rows in the game grid
 */
export const GridRows = 51;

/**
 * Number of columns in the game grid.
 */
export const GridColumns = 51;

/**
 * Player start position on the X axis
 */
export const PlayerStartCoordinateX = Math.ceil(GridRows / 2);

/**
 * Player start position on the Y axis
 */
export const PlayerStartCoordinateY = Math.ceil(GridColumns / 2);

/**
 * The length of the snake at the start of the game.
 */
export const StartingSnakeLength = 3;

/**
 * Cell width.
 */
export const cellWidth  = 15;

/**
 * Cell height
 */
export const cellHeight = 15;

/**
 * Offset where to position cells on the X axis.
 */
export const screenXOffset = (window.screen.availWidth / 2) - (cellWidth * PlayerStartCoordinateX);

/**
 * Offset where to postion cells on the Y axis.
 */
export const screenYOffset = (window.screen.availHeight / 2) - (cellHeight * PlayerStartCoordinateY);

export const DebugOptions = {
    manualMovement: true,
};
