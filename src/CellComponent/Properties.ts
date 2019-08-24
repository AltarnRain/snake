/**
 * Cell properties
 */

import { Actors } from "../Types";

export interface Properties {
    /**
     * This cell's color
     */
    actor: Actors;

    /**
     * The row of the cell
     */
    row: number;

    /**
     * The column of the cell.
     */
    column: number;
}