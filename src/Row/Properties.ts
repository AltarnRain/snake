/**
 * Row properties
 */

import { Actors } from "../Types";

export interface Properties {
    /**
     * Row cells
     */
    actors: Actors[];

    row: number;
}