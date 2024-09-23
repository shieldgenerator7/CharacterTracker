"use strict";

import Log from "../Data/Log";
import LogEntryFrame from "./LogEntryFrame";

function LogPanel({ log }) {
    console.log("log", log);
    return (
        <div>
            {
                log.entryList.map((entry, i) => (
                    <LogEntryFrame
                        entry={entry}
                        key={`log_entry_${i}`}
                    ></LogEntryFrame>
                ))
            }
        </div>
    );
}
export default LogPanel;
