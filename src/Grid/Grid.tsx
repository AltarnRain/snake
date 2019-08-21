/**
 * The grid component.
 */

import React from "react";
import { getInitialGrid } from "../Lib/Lib";
import { Row } from "../Row/Row";
import { Properties } from "./Properties";
import { State } from "./State";

export class Grid extends React.Component<Properties, State> {

    /**
     * Constructs the component.
     */
    constructor(props: Properties) {
        super(props);

        this.state = {
            gridActors: getInitialGrid()
        };
    }

    public render(): React.ReactNode {
        return (

            <>
                {
                    this.state.gridActors.map((rowActors, index) => <Row key={index} row={index} actors={rowActors}/>)
                }
            </>
        );
    }
}