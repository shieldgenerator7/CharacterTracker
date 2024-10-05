"use strict";

import Log from "../Data/Log";
import LogEntryFrame from "./LogEntryFrame";
import React from "react";

class LogPanel extends React.Component {
    constructor(props) {
        super(props);
        this.panel = React.createRef();
        this.logList = [];
        this.filterLog(this.props.game.event);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let div = this.panel.current;
        div.scrollTop = div.scrollHeight;
        this.filterLog(this.props.game.event);
    }

    filterLog(filter) {
        this.logList = this.props.log.entryList;
        if (filter) {
            let filterList = filter.trim().toLowerCase().split(" ").map(f=>f.trim()).filter(f=>f);
            this.logList = this.logList.filter(entry => filterList.every(f=> entry.includes(f)));
        }
    }

    render() {
        return (
            <div className="logPanel"
                ref={this.panel}
            >
                {
                    this.logList.slice(-100).map((entry, i) => (
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
