
/**
 * Grid state
 */
import { GridCoordinates } from "../Models";
import { Actors, Directions } from "../Types";

export interface State {

    /**
     * Actors in the grid
     */
    gridActors: Actors[][];

    /**
     * The direction the player is traveling in.
     */
    direction: Directions;

    /**
     * The current player coordinates
     */
    playerCoordinates: GridCoordinates;

    /**
     * The coordinates of the fruit.
     */
    fruitCoordinates: GridCoordinates;

    /**
     * The length of the snake
     */
    snakeLength: number;

    /**
     * True when the game is lost
     */
    gameLost: boolean;
}