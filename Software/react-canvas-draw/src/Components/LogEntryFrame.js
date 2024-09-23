"use strict";

function LogEntryFrame({ entry }) {
    return (
        <div className="logEntryName">
            {entry.DisplayText}
        </div>
    );
}
export default LogEntryFrame;
