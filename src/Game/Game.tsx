/**
 * The grid component.
 */

import React, { CSSProperties } from "react";
import { CellWidthAndHeight, DebugOptions, GameColumns, GameRows, screenXOffset, screenYOffset, StartingSnakeLength, TimeTick } from "../Constants";
import { areCoordinatesOutsideGrid, coordinateExistsInSet, getNextCoordinate, getPlayerStartCoordinates, getRandomGridCoordinates, keyCodeToDirection, validNewDirection } from "../Lib/Lib";
import { GameCoordinate } from "../Models";
import { Direction } from "../Types";
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
    private currentDirection: Direction = "up";

    /**
     * The direction given my player input.
     */
    private newDirection?: Direction;

    /**
     * Constructs the component.
     */
    constructor(props: object) {
        super(props);

        this.state = this.getInitialState();

        this.onKeyUp = this.onKeyUp.bind(this);
        this.gameTick = this.gameTick.bind(this);
        this.playAgain = this.playAgain.bind(this);
    }

    private getInitialState(): State {
        const playerCoordinates = getPlayerStartCoordinates();
        const fruitCoordinate = getRandomGridCoordinates(playerCoordinates);

        return {
            playerCoordinates,
            fruitCoordinate,
            snakeLength: StartingSnakeLength,
            gameLost: false,
        };
    }

    /**
     * Called after the component mounts
     */
    public componentDidMount(): void {
        document.addEventListener("keyup", this.onKeyUp);

        if (!DebugOptions.manualMovement) {
            this.gameTickTimer = window.setInterval(this.gameTick, TimeTick);
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
     * Restarts a game.
     */
    private playAgain(): void {
        this.setState(this.getInitialState());
    }

    /**
     * Renders the game grid.
     * @returns {ReactNode}.
     */
    public render(): React.ReactNode {

        const blockStyle: CSSProperties = {
            position: "absolute",
            height: `${CellWidthAndHeight}px`,
            width: `${CellWidthAndHeight}px`,
        };

        const gameFieldStyle: CSSProperties = {
            position: "absolute",
            height: `${CellWidthAndHeight * GameColumns}px`,
            width: `${CellWidthAndHeight * GameRows}px`,
            backgroundColor: "green",
            left: screenXOffset,
            top: screenYOffset,
        };

        const fruitStyle: CSSProperties = {
            ...blockStyle,
            backgroundColor: "red",
            left: this.state.fruitCoordinate.x * CellWidthAndHeight,
            top: this.state.fruitCoordinate.y * CellWidthAndHeight,
            borderRadius: "50%"
        };

        const snakeStyle: CSSProperties = {
            ...blockStyle,
            backgroundColor: this.state.gameLost ? "brown" : "yellow",
        };

        const scoreStype: CSSProperties = {
            position: "absolute",
            color: "white",
            top: screenYOffset,
            left: screenXOffset - 100
        };

        return (
            <div>
                <p style={scoreStype}>Length: {this.state.snakeLength}</p>
                <p style={{ ...scoreStype, top: screenYOffset + 30 }}>Fruits: {this.state.snakeLength - StartingSnakeLength}</p>
                {
                    this.state.gameLost ?
                        <button style={{ position: "absolute", top: screenYOffset + 70, left: screenXOffset - 100 }} onClick={this.playAgain}>Play again?</button>
                        : null
                }
                <div style={gameFieldStyle}>
                    <div style={fruitStyle} />
                    {
                        this.state.playerCoordinates.map((coordinate, key) =>
                            <div key={key} style={
                                {
                                    ...snakeStyle,
                                    left: coordinate.x * CellWidthAndHeight,
                                    top: coordinate.y * CellWidthAndHeight,
                                }
                            } />
                        )
                    }
                </div>
            </div>
        );
    }
}