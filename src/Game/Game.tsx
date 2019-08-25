/**
 * The grid component.
 */

import React, { CSSProperties } from "react";
import { CellHeight, CellWidth, DebugOptions, GameColumns, GameRows, StartingSnakeLength, screenXOffset, screenYOffset } from "../Constants";
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
     * The direction the snake is traveling in. This is never updated directly by a keypress.
     * It is set in the GameTick method when the newDirection is valid.
     * It is also used to move the snake when no keypress was pending.
     */
    private currentDirection: Directions = "up";

    /**
     * The direction given my player input.
     */
    private newDirection?: Directions;

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
            this.gameTickTimer = window.setInterval(this.gameTick, 150);
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

        if (typeof this.newDirection !== "undefined" && validNewDirection(this.newDirection, this.currentDirection)) {
            // The new direction is valid comparied to the current one. Update this.currentDirection to set
            // the new direction of travel.
            this.currentDirection = this.newDirection;

            // Clear this.newDirection to indicate no move is pending.
            this.newDirection = undefined;
        }

        const newPlayerCoordinate = getNextCoordinate(this.state.playerCoordinates[0], this.currentDirection);

        if (areCoordinatesOutsideGrid(newPlayerCoordinate)) {
            this.setState({ gameLost: true, gameLostMessage: "You went outside the play field." });
            return;
        }

        let snakeLength = this.state.snakeLength;
        let fruitCoordinate = this.state.fruitCoordinate;

        let playerCoordinates: GameCoordinate[] = [...this.state.playerCoordinates];
        if (this.state.fruitCoordinate.x === newPlayerCoordinate.x &&
            this.state.fruitCoordinate.y === newPlayerCoordinate.y) {

            snakeLength++;
            fruitCoordinate = getRandomGridCoordinates(playerCoordinates);
        } else {
            // Remove last element
            playerCoordinates.pop();
        }

        // It is possible from length 5 or bigger to hit your tail, not before.
        if (snakeLength > 4) {
            if (coordinateExistsInSet(playerCoordinates, newPlayerCoordinate)) {
                this.setState({ gameLost: true, gameLostMessage: "You hit your tail." });
                return;
            }
        }

        playerCoordinates = [newPlayerCoordinate, ...playerCoordinates];

        this.setState({ playerCoordinates, snakeLength, fruitCoordinate }, callback);
    }

    /**
     * Handles a keypress.
     * @param {KeyboardEvent } e. A keyboard event.
     */
    private onKeyUp(e: KeyboardEvent): void {
        if (e) {
            const direction = keyCodeToDirection(e.keyCode);

            this.newDirection = direction;

            if (DebugOptions.manualMovement) {
                this.gameTick();
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
            left: screenXOffset,
            top: screenYOffset,
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
            borderRadius: "50%"
        };

        const snakeStyle: CSSProperties = {
            position: "absolute",
            backgroundColor: "yellow",
            width: `${CellWidth}px`,
            height: `${CellHeight}px`,
        };

        return (
            <div>
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
                                    <div key={key} style={
                                        {
                                            ...snakeStyle,
                                            left: coordinate.x * CellWidth,
                                            top: coordinate.y * CellHeight,
                                        }
                                    } />
                                )
                            }
                        </div>
                }
            </div>
        );
    }
}