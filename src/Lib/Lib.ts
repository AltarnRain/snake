/**
 * Lib. Lots of helper functions.
 */

import { GridColumns, GridRows } from "../Constants";
import { GridCoordinates } from "../Models";
import { Actors, Directions } from "../Types";

/**
 * Creates the initial game grid.
 */
export function getInitialGrid(): Actors[][] {
    const grid: Actors[][] = [];

    for (let row = 0; row < GridRows; row++) {
        const rowActors: Actors[] = [];

        for (let column = 0; column < GridColumns; column++) {
            rowActors.push("background");
        }

        grid.push(rowActors);
    }

    return grid;
}

export function getActorColor(actor: Actors): string {
    switch (actor) {
        case "background":
            return "green";
        case "fruit":
            return "red";
        case "player":
            return "yellow";
    }
}

/**
 * Returns a random position on the grid.
 */
export function getRandomGridCoordinates(): GridCoordinates {
    const x = Math.ceil(Math.random() * GridRows);
    const y = Math.ceil(Math.random() * GridColumns);

    return {
        x,
        y
    };
}

/**
 * Returns the direction for left, up, right, down.
 * @param {number} keyCode.
 */
export function keyCodeToDirection(keyCode: number): Directions {
    switch (keyCode) {
        case 37:
            return "left";
        case 38:
            return "up";
        case 39:
            return "right";
        case 40:
            return "down";
    }
}

export function getNextCoordinate(coordinate: GridCoordinates, direction: Directions): GridCoordinates {

    const newCoordinates = { ...coordinate };

    switch (direction) {
        case "left":
            newCoordinates.x--;
            break;
        case "up":
            newCoordinates.y--;
            break;
        case "right":
            newCoordinates.x++;
            break;
        case "down":
            newCoordinates.y++;
            break;
    }

    return newCoordinates;
}