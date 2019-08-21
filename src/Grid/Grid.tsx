/**
 * The grid component.
 */

import React, { ReactNode } from "react";
import { PlayerStartPosition } from "../Constants";
import { getInitialGrid, getNextCoordinate, getRandomGridCoordinates, keyCodeToDirection } from "../Lib/Lib";
import { GridCoordinates } from "../Models";
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
        };

        this.onKeyUp = this.onKeyUp.bind(this);
        this.gameTick = this.gameTick.bind(this);

        this.state.gridActors[PlayerStartPosition.x][PlayerStartPosition.y] = "player";
        this.state.gridActors[fruitCoordinates.x][fruitCoordinates.y] = "fruit";

    }

    public componentDidMount(): void {
        document.addEventListener("keyup", this.onKeyUp);

        this.gameTickTimer = window.setInterval(this.gameTick, 500);
    }

    public componentWillUnmount(): void {
        document.removeEventListener("keyup", this.onKeyUp);

        window.clearInterval(this.gameTickTimer);
    }

    private gameTick(): void {
        const coordinates = getNextCoordinate(this.state.playerCoordinates, this.state.direction);
        this.setPlayerCoordinatesInState(coordinates);
    }

    private onKeyUp(e: KeyboardEvent): void {
        if (e) {
            const direction = keyCodeToDirection(e.keyCode);
            this.setState({direction});
        }
    }

    private setPlayerCoordinatesInState(playerCoordinates: GridCoordinates): void {
        const gridActors = [...this.state.gridActors];
        gridActors[this.state.playerCoordinates.x][this.state.playerCoordinates.y] = "background";
        gridActors[playerCoordinates.x][playerCoordinates.y] = "player";

        this.setState({ gridActors, playerCoordinates });
    }

    /**
     * Renders the game grid.
     * @returns {ReactNode}.
     */
    public render(): React.ReactNode {
        return (

            <>
                {
                    this.state.gridActors.map((rowActors, index) => <Row key={index} row={index} actors={rowActors} />)
                }
            </>
        );
    }
}