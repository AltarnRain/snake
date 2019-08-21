/**
 * The grid component.
 */

import React from "react";
import { PlayerStartPosition, GridColumns, GridRows } from "../Constants";
import { getInitialGrid, getNextCoordinate, getRandomGridCoordinates, keyCodeToDirection, validNewDirection } from "../Lib/Lib";
import { Row } from "../Row/Row";
import { Properties } from "./Properties";
import { State } from "./State";

export class Grid extends React.Component<Properties, State> {

    /**
     * Reference number to the interval.
     */
    private gameTickTimer: number | undefined;

    /**
     * Constructs the component.
     */
    constructor(props: Properties) {
        super(props);

        const fruitCoordinates = getRandomGridCoordinates();

        this.state = {
            gridActors: getInitialGrid(),
            playerCoordinates: PlayerStartPosition,
            fruitCoordinates,
            direction: "up",
            snakeLength: 1,
            gameLost: false
        };

        this.onKeyUp = this.onKeyUp.bind(this);
        this.gameTick = this.gameTick.bind(this);

        this.state.gridActors[PlayerStartPosition.x][PlayerStartPosition.y] = "player";
        this.state.gridActors[fruitCoordinates.x][fruitCoordinates.y] = "fruit";
    }

    /**
     * Called after the component mounts
     */
    public componentDidMount(): void {
        document.addEventListener("keyup", this.onKeyUp);

        this.gameTickTimer = window.setInterval(this.gameTick, 100);
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
        const gridActors = [...this.state.gridActors];
        gridActors[this.state.playerCoordinates.x][this.state.playerCoordinates.y] = "background";

        const playerCoordinates = getNextCoordinate(this.state.playerCoordinates, this.state.direction);
        let fruitCoordinates = this.state.fruitCoordinates;
        let snakeLength = this.state.snakeLength;

        if (playerCoordinates.x < 0 ||
            playerCoordinates.x >= GridColumns ||
            playerCoordinates.y < 0 ||
            playerCoordinates.y >= GridRows) {
            this.setState({ gameLost: true });
            return;
        }

        const newPlayerLocation = gridActors[playerCoordinates.x][playerCoordinates.y];
        if (newPlayerLocation === "fruit") {
            snakeLength++;

            fruitCoordinates = getRandomGridCoordinates();
            gridActors[fruitCoordinates.x][fruitCoordinates.y] = "fruit";
        }

        gridActors[playerCoordinates.x][playerCoordinates.y] = "player";

        this.setState({ gridActors, playerCoordinates, snakeLength });
    }

    private onKeyUp(e: KeyboardEvent): void {
        if (e) {
            const direction = keyCodeToDirection(e.keyCode);
            if (validNewDirection(direction, this.state.direction)) {
                this.setState({ direction });
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