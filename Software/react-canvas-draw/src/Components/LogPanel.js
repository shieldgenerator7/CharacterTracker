"use strict";

import Log from "../Data/Log";
import LogEntryFrame from "./LogEntryFrame";
import React from "react";

class LogPanel extends React.Component{
    constructor(props) {
        super(props)
        this.log = props.log;
    }

    render(){
    console.log("log", this.log);
    return (
        <div className="logPanel">
            {
                this.log.entryList.map((entry, i) => (
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
