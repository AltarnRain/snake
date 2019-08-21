/**
 * Cell properties
 */

import { Actors } from "../Types";

export interface Properties {
    /**
     * This cell's color
     */
    actor: Actors;

    row: number;

    column: number;
}