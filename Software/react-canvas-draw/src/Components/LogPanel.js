"use strict";

import Log from "../Data/Log";
import LogEntryFrame from "./LogEntryFrame";
import React from "react";

class LogPanel extends React.Component {
    constructor(props) {
        super(props);
        this.panel = React.createRef();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let div = this.panel.current;
        div.scrollTop = div.scrollHeight;
    }

    render() {
        let logList = this.props.log.entryList;
        let filter = this.props.game.event;
        if (filter) {
            let filterList = filter.trim().toLowerCase().split(" ").map(f => f.trim()).filter(f => f);
            logList = logList.filter(entry => filterList.every(f => entry.includes(f)));
        }
        return (
            <div className="logPanel"
                ref={this.panel}
            >
                {
                    logList.slice(-100).map((entry, i) => (
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
