"use strict";

import Log from "../Data/Log";
import LogEntryFrame from "./LogEntryFrame";
import React from "react";

class LogPanel extends React.Component{
    constructor(props) {
        super(props)
    }

    render(){
    return (
        <div className="logPanel">
            {
                this.props.log.entryList.map((entry, i) => (
                    <LogEntryFrame
                        entry={entry}
                        key={`log_entry_${i}`}
                    ></LogEntryFrame>
                ))
            }
        </div>
    );
}
}
export default LogPanel;
