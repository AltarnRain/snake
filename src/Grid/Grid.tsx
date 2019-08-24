/**
 * The grid component.
 */

import React from "react";
import { GridColumns, GridRows, PlayerStartPositions } from "../Constants";
import { getInitialGrid, getNextCoordinate, getRandomGridCoordinates, keyCodeToDirection, validNewDirection } from "../Lib/Lib";
import { GridCoordinates } from "../Models";
import { Row } from "../Row/Row";
import { Directions } from "../Types";
import { Properties } from "./Properties";
import { State } from "./State";

export class Grid extends React.Component<Properties, State> {

    /**
     * Reference number to the interval.
     */
    private gameTickTimer: number | undefined;

    /**
     * The direction the player is traveling in.
     */
    private direction: Directions;

    /**
     * The current player coordinates
     */
    private playerCoordinates: GridCoordinates[] = PlayerStartPositions;

    /**
     * The coordinates of the fruit.
     */
    private fruitCoordinates: GridCoordinates = getRandomGridCoordinates();

    /**
     * Constructs the component.
     */
    constructor(props: Properties) {
        super(props);

        this.state = {
            gridActors: getInitialGrid(),
            snakeLength: 1,
            gameLost: false
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

        const gridActors = [...this.state.gridActors];
        this.playerCoordinates.forEach((coord) => gridActors[coord.x][coord.y] = "player");
        this.setState({gridActors});

        // this.gameTickTimer = window.setInterval(this.gameTick, 100);
    }

    /**
     * Called just before the component unmounts
     */
    public componentWillUnmount(): void {
        document.removeEventListener("keyup", this.onKeyUp);

        // window.clearInterval(this.gameTickTimer);
    }

    /**
     * Main game loop
     */
    private gameTick(): void {
        const gridActors = [...this.state.gridActors];
        this.playerCoordinates.forEach((coord) => gridActors[coord.x][coord.y] = "background");

        const newPlayerCoordinate = getNextCoordinate(this.playerCoordinates[0], this.direction);

        if (newPlayerCoordinate.x < 0 ||
            newPlayerCoordinate.x >= GridColumns ||
            newPlayerCoordinate.y < 0 ||
            newPlayerCoordinate.y >= GridRows) {
            this.setState({ gameLost: true });
            return;
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
                this.gameTick();
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
                    this.state.gameLost ? <div>You lost the game</div>
                        :
                        this.state.gridActors.map((rowActors, index) => <Row key={index} row={index} actors={rowActors} />)
                }
            </>
        );
    }
}