/**
 * Lib. Lots of helper functions.
 */

import { GridColumns, GridRows, PlayerStartCoordinateX, PlayerStartCoordinateY, StartingSnakeLength } from "../Constants";
import { GridCoordinate } from "../Models";
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
export function getRandomGridCoordinates(): GridCoordinate {
    const x = Math.ceil(Math.random() * (GridRows - 1));
    const y = Math.ceil(Math.random() * (GridColumns - 1));

    return {
        x,
        y
    };
}

/**
 * Gets the grid coordinates where the player's body will be based on the initial snake length
 * @returns {GridCoordinate}. The player's initial grid coordinates.
 */
export function getPlayerStartCoordinate(): GridCoordinate[] {
    const playerStartCoordinates: GridCoordinate[] = [ { x: PlayerStartCoordinateX, y: PlayerStartCoordinateY } ];
    for (let i = 1; i < StartingSnakeLength; i++) {
        const lastCoordinate = {...playerStartCoordinates[i - 1]};
        lastCoordinate.y++;
        playerStartCoordinates.push(lastCoordinate);
    }

    return playerStartCoordinates;
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
 * @returns {GridCoordinate}. A new grid coordinate
 */
export function getNextCoordinate(coordinate: GridCoordinate, direction: Directions): GridCoordinate {

    const newCoordinate = { ...coordinate };

    switch (direction) {
        case "left":
            newCoordinate.x--;
            break;
        case "up":
            newCoordinate.y--;
            break;
        case "right":
            newCoordinate.x++;
            break;
        case "down":
            newCoordinate.y++;
            break;
    }

    return newCoordinate;
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
 * Returns true of the passed coordinates are outside the bounds of the game grid.
 * @param {GridCoordinate} coordinates The coordinate to check
 * @returns {boolean}. True if the coordinats are outside the game grid.
 */
export function areCoordinatesOutsideGrid(coordinate: GridCoordinate): boolean {
    return (coordinate.x < 0 ||
        coordinate.x >= GridColumns ||
        coordinate.y < 0 ||
        coordinate.y >= GridRows);
}

/**
 * Checks if coordinates overlap between two arrays of GridCoordinates
 * @param {GridCoordinate[]} coordinateSet. Set of coordinates.
 * @param {GridCoordinate} coordinates. The coordinate to check
 */
export function coordinateExistsInSet(coordinates: GridCoordinate[], coordinate: GridCoordinate): boolean {
    return  coordinates.some((coords) => coords.x === coordinate.x && coords.y === coordinate.y);
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