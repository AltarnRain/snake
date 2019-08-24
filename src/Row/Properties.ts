/**
 * Row properties
 */

import { Actors } from "../Types";

export interface Properties {
    /**
     * Row cells
     */
    actors: Actors[];

    /**
     * The row.
     */
    row: number;
}