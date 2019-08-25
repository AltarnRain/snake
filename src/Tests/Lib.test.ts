/**
 * Tests the lib functions
 */

import "jest";
import { GameColumns, GameRows } from "../Constants";
import { coordinateExistsInSet, getActorColor, getNextCoordinate, getPlayerStartCoordinates, getRandomGridCoordinates, keyCodeToDirection, validNewDirection } from "../Lib/Lib";
import { GameCoordinate } from "../Models";
import { Directions } from "../Types";

describe("Test lib functions", () => {
    it("retuns the expected color for an Actor", () => {

        // Act
        const green = getActorColor("background");
        const yellow = getActorColor("player");
        const red = getActorColor("fruit");

        expect(green).toBe("green");
        expect(yellow).toBe("yellow");
        expect(red).toBe("red");
    });

    it("returns two numbers within the game grid limit", () => {
        // Act
        const coordinates = getRandomGridCoordinates();

        // Assert
        expect(coordinates.x).toBeGreaterThanOrEqual(0);
        expect(coordinates.y).toBeGreaterThanOrEqual(-1);
        expect(coordinates.x).toBeLessThanOrEqual(GameRows);
        expect(coordinates.y).toBeLessThanOrEqual(GameColumns);
    });

    it("returns the snake''s start position", () => {
        // Act
        const playerStartCoordinates = getPlayerStartCoordinates();

        // Assert
        expect(playerStartCoordinates[0].x).toBe(Math.ceil(GameRows / 2));
        expect(playerStartCoordinates[0].y).toBe(Math.ceil(GameColumns / 2));

        const headCoordiantes = playerStartCoordinates[0];
        expect(playerStartCoordinates[1].x).toBe(headCoordiantes.x);
        expect(playerStartCoordinates[1].y).toBe(headCoordiantes.y + 1);

        expect(playerStartCoordinates[2].x).toBe(headCoordiantes.x);
        expect(playerStartCoordinates[2].y).toBe(headCoordiantes.y + 2);
    });

    it("translates a keycode to a direction", () => {
        // Act
        const left = keyCodeToDirection(37);
        const up = keyCodeToDirection(38);
        const right = keyCodeToDirection(39);
        const down = keyCodeToDirection(40);
        const other = keyCodeToDirection(41);

        // Assert
        expect(left).toBe("left");
        expect(up).toBe("up");
        expect(right).toBe("right");
        expect(down).toBe("down");
        expect(other).toBe(undefined);
    });

    it("returns the next coordinate depending on the passed direction", () => {
        // Arrange
        const coordinates: GameCoordinate = { x: 10, y: 10 };

        // Act
        const left = getNextCoordinate(coordinates, "left");
        const up = getNextCoordinate(coordinates, "up");
        const right = getNextCoordinate(coordinates, "right");
        const down = getNextCoordinate(coordinates, "down");

        expect(left.x).toBe(coordinates.x - 1);
        expect(left.y).toBe(coordinates.y);

        expect(up.x).toBe(coordinates.x);
        expect(up.y).toBe(coordinates.y - 1);

        expect(right.x).toBe(coordinates.x + 1);
        expect(right.y).toBe(coordinates.y);

        expect(down.x).toBe(coordinates.x);
        expect(down.y).toBe(coordinates.y + 1);
    });

    it("return truen when the new direction is not the oposite, false otherwise.", () => {
        // Act
        const directions: Directions[] = ["left", "up", "right", "down"];

        directions.forEach((direction) => {
            directions.forEach((newDirection) => {
                const result = validNewDirection(direction, newDirection);
                if (direction === "left" && newDirection === "right" ||
                    direction === "right" && newDirection === "left" ||
                    direction === "up" && newDirection === "down" ||
                    direction === "down" && newDirection === "up" ||
                    direction === "left" && newDirection === "right") {
                    expect(result).toBe(false);
                } else {
                    expect(result).toBe(true);
                }
            });
        });
    });

    it("can find an overlapping set of coordinate", () => {
        // Arrange
        const coordinateSet: GameCoordinate[] = [
            { x: 25, y: 25},
            { x: 26, y: 26},
            { x: 27, y: 27},
            { x: 28, y: 28},
        ];

        // Act
        const resultWhenInSet = coordinateExistsInSet(coordinateSet, { x: 26, y : 26 });
        const resultNotInSet = coordinateExistsInSet(coordinateSet, { x: 24, y : 24 });

        // Assert
        expect(resultWhenInSet).toBe(true);
        expect(resultNotInSet).toBe(false);
    });
});