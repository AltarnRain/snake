/**
 * Lib. Lots of helper functions.
 */

import { GridColumns, GridRows, StartingSnakeLength, PlayerStartPosition } from "../Constants";
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

/**
 * Converts an actor to a color.
 * @returns {string}. A color
 */
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
    const x = Math.ceil(Math.random() * (GridRows - 1));
    const y = Math.ceil(Math.random() * (GridColumns - 1));

    return {
        x,
        y
    };
}

/**
 * Gets the grid coordinates where the player's body will be based on the initial snake length
 * @returns {GridCoordinates}. The player's initial grid coordinates.
 */
export function getPlayerStartPositions(): GridCoordinates[] {
    const playerStartPositions: GridCoordinates[] = [PlayerStartPosition];
    for (let i = 1; i < StartingSnakeLength; i++) {
        const lastPosition = {...playerStartPositions[i - 1]};
        lastPosition.y++;
        playerStartPositions.push(lastPosition);
    }

    return playerStartPositions;
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

/**
 * Gets the next coordinate based on the passed direction
 * @returns {GridCoordinates}. A new grid coordinate
 */
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

/**
 * Returns true if the new direction is valid
 * @param {Directions} currentDirection. The current direction.
 * @param {Directions} newDirection. The new direciotn.
 */
export function validNewDirection(currentDirection: Directions, newDirection: Directions): boolean {
    return getOppositeDirection(currentDirection) !== newDirection;
}

/**
 * Returns the oposite direction.
 * @param {Directions} direction. A direction.
 * @returns {Directions}. The oposite direction.
 */
function getOppositeDirection(direction: Directions): Directions {
    switch (direction) {
        case "up":
            return "down";
        case "down":
            return "up";
        case "left":
            return "right";
        case "right":
            return "left";
    }
}