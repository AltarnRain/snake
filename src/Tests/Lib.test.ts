/**
 * Tests the lib functions
 */

import "jest";
import { GridColumns, GridRows } from "../Constants";
import { getActorColor, getRandomGridCoordinates } from "../Lib/Lib";

describe("Test lib functions", () => {
    it("retuns the expected color for an Actor", () => {
        const green = getActorColor("background");
        const yellow = getActorColor("player");
        const red = getActorColor("fruit");

        expect(green).toBe("green");
        expect(yellow).toBe("yellow");
        expect(red).toBe("red");
    });

    it("returns two numbers within the game grid limit", () => {
        const coordinates = getRandomGridCoordinates();

        expect(coordinates.x).toBeGreaterThanOrEqual(0);
        expect(coordinates.y).toBeGreaterThanOrEqual(-1);
        expect(coordinates.x).toBeLessThanOrEqual(GridRows);
        expect(coordinates.y).toBeLessThanOrEqual(GridColumns);
    });
});