import { GridColumns, GridRows } from "../Constants";
import { GridCoordinates } from "../Models";
import { Actors } from "../Types";

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

    const middleX = Math.floor(GridRows / 2);
    const middleY = Math.floor(GridColumns / 2);

    grid[middleX][middleY] = "player";

    const randomCoordinates = getRandomGridCoordinates();
    grid[randomCoordinates.x][randomCoordinates.y] = "fruit";

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