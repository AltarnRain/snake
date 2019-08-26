/**
 * Grid state
 */
import { GameCoordinate } from "../Models";

export interface State {

    /**
     * The length of the snake
     */
    snakeLength: number;

    /**
     * True when the game is lost
     */
    gameLost: boolean;

    /**
     * The current player coordinates
     */
    playerCoordinates: GameCoordinate[];

    /**
     * The coordinates of the fruit.
     */
    fruitCoordinate: GameCoordinate;
}