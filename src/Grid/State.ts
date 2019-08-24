
/**
 * Grid state
 */
import { Actors } from "../Types";

export interface State {

    /**
     * Actors in the grid
     */
    gridActors: Actors[][];

    /**
     * The length of the snake
     */
    snakeLength: number;

    /**
     * True when the game is lost
     */
    gameLost: boolean;

    /**
     * The reason the player lost the game.
     */
    gameLostMessage?: string;
}