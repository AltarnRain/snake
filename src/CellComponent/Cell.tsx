/**
 * The cell component.
 */

import React, { CSSProperties } from "react";
import { getActorColor } from "../Lib/Lib";
import { Properties } from "./Properties";

export const Cell: React.FC<Properties> = (props) => {

    const width  = 15;
    const height = 15;

    /**
     * The cell style
     */
    const cellStyle: CSSProperties = {
        backgroundColor: getActorColor(props.actor),
        width: `${width}px`,
        height: `${height}px`,
        left: props.row * width,
        top: props.column * height,
        position: "absolute",
    };

    /**
     * Renders the component
     * @returns {ReactNode}
     */
    return (
        <div style={cellStyle}></div>
    );
};