/**
 * The cell component.
 */

import React, { CSSProperties } from "react";
import { cellHeight, cellWidth, screenXOffset, screenYOffset } from "../Constants";
import { getActorColor } from "../Lib/Lib";
import { Properties } from "./Properties";

export const Cell: React.FC<Properties> = (props) => {

    /**
     * The cell style
     */
    const cellStyle: CSSProperties = {
        backgroundColor: getActorColor(props.actor),
        width: `${cellWidth}px`,
        height: `${cellHeight}px`,
        left: (props.row * cellWidth) + screenXOffset,
        top: (props.column * cellHeight) + screenYOffset,
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