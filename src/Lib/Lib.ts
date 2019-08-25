/**
 * Lib. Lots of helper functions.
 */

import { GameColumns, GameRows, PlayerStartCoordinateX, PlayerStartCoordinateY, StartingSnakeLength } from "../Constants";
import { GameCoordinate } from "../Models";
import { Directions } from "../Types";

/**
 * Returns a random position on the grid.
 */
export function getRandomGridCoordinates(exclude: GameCoordinate[]): GameCoordinate {

    while (true) {
        const x = Math.ceil(Math.random() * (GameRows - 1));
        const y = Math.ceil(Math.random() * (GameColumns - 1));

        const coordinate: GameCoordinate = { x, y };

        // Ensure a fruit is never placed on a player.
        if (!coordinateExistsInSet(exclude, coordinate)) {
            return coordinate;
        }
    }
}

/**
 * Gets the grid coordinates where the player's body will be based on the initial snake length
 * @returns {GameCoordinate}. The player's initial grid coordinates.
 */
export function getPlayerStartCoordinates(): GameCoordinate[] {
    const playerStartCoordinates: GameCoordinate[] = [{ x: PlayerStartCoordinateX, y: PlayerStartCoordinateY }];
    for (let i = 1; i < StartingSnakeLength; i++) {
        const lastCoordinate = { ...playerStartCoordinates[i - 1] };
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
 * @returns {GameCoordinate}. A new grid coordinate
 */
export function getNextCoordinate(coordinate: GameCoordinate, direction: Directions): GameCoordinate {

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
 * @param {GameCoordinate} coordinates The coordinate to check
 * @returns {boolean}. True if the coordinats are outside the game grid.
 */
export function areCoordinatesOutsideGrid(coordinate: GameCoordinate): boolean {
    return (coordinate.x < 0 ||
        coordinate.x >= GameColumns ||
        coordinate.y < 0 ||
        coordinate.y >= GameRows);
}

/**
 * Checks if coordinates overlap between two arrays of GridCoordinates
 * @param {GameCoordinate[]} coordinateSet. Set of coordinates.
 * @param {GameCoordinate} coordinates. The coordinate to check
 */
export function coordinateExistsInSet(coordinates: GameCoordinate[], coordinate: GameCoordinate): boolean {
    return coordinates.some((coords) => coords.x === coordinate.x && coords.y === coordinate.y);
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