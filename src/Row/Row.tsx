
/**
 * Row component
 */

import React from "react";
import { Cell } from "../CellComponent/Cell";
import { Properties } from "./Properties";
export const Row: React.FC<Properties> = (props) => {

    return (
        <>
            {
                props.actors.map((color, index) => <Cell key={index} row={props.row} column={index} actor={color} />)
            }
        </>
    );
};