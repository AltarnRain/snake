/**
 * The grid component.
 */

import React from "react";
import { StartingSnakeLength } from "../Constants";
import { areCoordinatesOutsideGrid, coordinateExistsInSet, getInitialGrid, getNextCoordinate, getPlayerStartCoordinate, getRandomGridCoordinates, keyCodeToDirection, validNewDirection } from "../Lib/Lib";
import { GridCoordinate } from "../Models";
import { Row } from "../Row/Row";
import { Directions } from "../Types";
import { State } from "./State";

export class Grid extends React.Component<{}, State> {

    /**
     * Reference number to the interval.
     */
    private gameTickTimer: number | undefined;

    /**
     * The direction the player is traveling in.
     */
    private direction: Directions = "up";

    /**
     * The current player coordinates
     */
    private playerCoordinates: GridCoordinate[] = getPlayerStartCoordinate();

    /**
     * The coordinates of the fruit.
     */
    private fruitCoordinates: GridCoordinate = getRandomGridCoordinates();

    /**
     * Constructs the component.
     */
    constructor(props: object) {
        super(props);

        const gridActors = getInitialGrid();
        this.playerCoordinates.forEach((coord) => gridActors[coord.x][coord.y] = "player");
        gridActors[this.fruitCoordinates.x][this.fruitCoordinates.y] = "fruit";

        this.state = {
            gridActors,
            snakeLength: StartingSnakeLength,
            gameLost: false,
        };

        this.onKeyUp = this.onKeyUp.bind(this);
        this.gameTick = this.gameTick.bind(this);
    }

    private setNewFruitPosition(): void {
        this.fruitCoordinates = getRandomGridCoordinates();
    }

    /**
     * Called after the component mounts
     */
    public componentDidMount(): void {
        document.addEventListener("keyup", this.onKeyUp);

        this.gameTickTimer = window.setInterval(this.gameTick, 200);
    }

    /**
     * Called just before the component unmounts
     */
    public componentWillUnmount(): void {
        document.removeEventListener("keyup", this.onKeyUp);

        window.clearInterval(this.gameTickTimer);
    }

    /**
     * Main game loop
     */
    private gameTick(): void {

        // Stop the game from updating if the player lost the game.
        if (this.state.gameLost) {
            return;
        }

        const gridActors = [...this.state.gridActors];

        this.playerCoordinates.forEach((coord) => gridActors[coord.x][coord.y] = "background");

        const newPlayerCoordinate = getNextCoordinate(this.playerCoordinates[0], this.direction);

        if (areCoordinatesOutsideGrid(newPlayerCoordinate)) {
            this.setState({ gameLost: true, gameLostMessage: "You went outside the play field." });
            return;
        }

        if (coordinateExistsInSet(this.playerCoordinates, newPlayerCoordinate)) {
            this.setState({ gameLost: true, gameLostMessage: "You hit your tail." });
        }

        let snakeLength = this.state.snakeLength;
        if (gridActors[newPlayerCoordinate.x][newPlayerCoordinate.y] === "fruit") {
            snakeLength++;

            gridActors[this.fruitCoordinates.x][this.fruitCoordinates.y] = "background";
            this.setNewFruitPosition();
            gridActors[this.fruitCoordinates.x][this.fruitCoordinates.y] = "fruit";

            this.playerCoordinates = [newPlayerCoordinate, ...this.playerCoordinates];

        } else {
            // Remove last element
            this.playerCoordinates.pop();

            this.playerCoordinates = [newPlayerCoordinate, ...this.playerCoordinates];
        }

        this.playerCoordinates.forEach((coord) => gridActors[coord.x][coord.y] = "player");
        this.setState({ gridActors, snakeLength });
    }

    /**
     * Handles a keypress.
     * @param {KeyboardEvent } e. A keyboard event.
     */
    private onKeyUp(e: KeyboardEvent): void {
        if (e) {
            const direction = keyCodeToDirection(e.keyCode);
            if (validNewDirection(direction, this.direction)) {
                this.direction = direction;
            }
        }
    }

    /**
     * Renders the game grid.
     * @returns {ReactNode}.
     */
    public render(): React.ReactNode {
        return (
            <>
                {
                    this.state.gameLost ?
                    <>
                        <p>{this.state.gameLostMessage}</p>
                        <p>The length of the snake was: {this.state.snakeLength.toString()}</p>
                    </>
                             :

                        this.state.gridActors.map((rowActors, index) => <Row key={index} row={index} actors={rowActors} />)
                }
            </>
        );
    }
}