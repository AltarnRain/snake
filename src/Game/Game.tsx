/**
 * The grid component.
 */

import React, { CSSProperties } from "react";
import { CellHeight, CellWidth, DebugOptions, GameColumns, GameRows, StartingSnakeLength } from "../Constants";
import { areCoordinatesOutsideGrid, coordinateExistsInSet, getNextCoordinate, getPlayerStartCoordinates, getRandomGridCoordinates, keyCodeToDirection, validNewDirection } from "../Lib/Lib";
import { GameCoordinate } from "../Models";
import { Directions } from "../Types";
import { State } from "./State";

export class Game extends React.Component<{}, State> {

    /**
     * Reference number to the interval.
     */
    private gameTickTimer: number | undefined;

    /**
     * The direction the player is traveling in.
     */
    private direction: Directions = "up";

    /**
     * Constructs the component.
     */
    constructor(props: object) {
        super(props);

        const playerCoordinates = getPlayerStartCoordinates();
        const fruitCoordinate = getRandomGridCoordinates(playerCoordinates);

        this.state = {
            playerCoordinates,
            fruitCoordinate,
            snakeLength: StartingSnakeLength,
            gameLost: false,
        };

        this.onKeyUp = this.onKeyUp.bind(this);
        this.gameTick = this.gameTick.bind(this);
    }

    /**
     * Called after the component mounts
     */
    public componentDidMount(): void {
        document.addEventListener("keyup", this.onKeyUp);

        if (!DebugOptions.manualMovement) {
            this.gameTickTimer = window.setInterval(this.gameTick, 200);
        }
    }

    /**
     * Called just before the component unmounts
     */
    public componentWillUnmount(): void {
        document.removeEventListener("keyup", this.onKeyUp);

        if (typeof this.gameTickTimer !== "undefined") {
            window.clearInterval(this.gameTickTimer);
        }
    }

    /**
     * Main game loop
     */
    private gameTick(callback?: () => void): void {

        // Stop the game from updating if the player lost the game.
        if (this.state.gameLost) {
            return;
        }

        const newPlayerCoordinate = getNextCoordinate(this.state.playerCoordinates[0], this.direction);

        if (areCoordinatesOutsideGrid(newPlayerCoordinate)) {
            this.setState({ gameLost: true, gameLostMessage: "You went outside the play field." });
            return;
        }

        if (coordinateExistsInSet(this.state.playerCoordinates, newPlayerCoordinate)) {
            this.setState({ gameLost: true, gameLostMessage: "You hit your tail." });
            return;
        }

        let snakeLength = this.state.snakeLength;
        let fruitCoordinate = this.state.fruitCoordinate;

        let playerCoordinates: GameCoordinate[] = [...this.state.playerCoordinates];
        if (this.state.fruitCoordinate.x === newPlayerCoordinate.x &&
            this.state.fruitCoordinate.y === newPlayerCoordinate.y) {

            snakeLength++;

            playerCoordinates = [newPlayerCoordinate, ...this.state.playerCoordinates];
            fruitCoordinate = getRandomGridCoordinates(playerCoordinates);

        } else {
            // Remove last element
            playerCoordinates.pop();

            playerCoordinates = [newPlayerCoordinate, ...playerCoordinates];
        }
        this.setState({ playerCoordinates, snakeLength, fruitCoordinate }, callback);
    }

    /**
     * Handles a keypress.
     * @param {KeyboardEvent } e. A keyboard event.
     */
    private onKeyUp(e: KeyboardEvent): void {
        if (e) {
            const direction = keyCodeToDirection(e.keyCode);
            if (typeof direction !== "undefined" && validNewDirection(direction, this.direction)) {
                this.direction = direction;

                if (DebugOptions.manualMovement) {
                    this.gameTick();
                }
            }
        }
    }

    /**
     * Renders the game grid.
     * @returns {ReactNode}.
     */
    public render(): React.ReactNode {

        const gameFieldStyle: CSSProperties = {
            position: "absolute",
            backgroundColor: "green",
            left: 0,
            top: 0,
            height: `${CellWidth * GameColumns}px`,
            width: `${CellHeight * GameRows}px`,
        };

        const fruitStyle: CSSProperties = {
            position: "absolute",
            backgroundColor: "red",
            width: `${CellWidth}px`,
            height: `${CellHeight}px`,
            left: this.state.fruitCoordinate.x * CellWidth,
            top: this.state.fruitCoordinate.y * CellHeight,
        };

        const snakeStyle: CSSProperties = {
            position: "absolute",
            backgroundColor: "yellow",
            width: `${CellWidth}px`,
            height: `${CellHeight}px`,
        };

        return (
            <>
                {
                    this.state.gameLost ?
                        <>
                            <p>{this.state.gameLostMessage}</p>
                            <p>The length of the snake was: {this.state.snakeLength.toString()}</p>
                        </>
                        :
                        <div style={gameFieldStyle}>
                            <div style={fruitStyle} />
                            {
                                this.state.playerCoordinates.map((coordinate, key) =>
                                    <div key={key} style={{ ...snakeStyle, left: coordinate.x * CellWidth, top: coordinate.y * CellHeight }} />
                                )
                            }
                        </div>
                }
            </>
        );
    }
}