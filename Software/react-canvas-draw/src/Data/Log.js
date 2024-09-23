"use strict";

import LogEntry from "./LogEntry";

class Log {
    constructor() {
        this.entryList = [];
    }

    recordEntryDieRoll(game, character, rollName, rollValue, rollResult) {
        let entry = new LogEntry(character, rollName);
        entry.rollValue = rollValue;
        entry.rollResult = rollResult;
        entry.event = game.event;
        entry.location = game.location;
        this.entryList.push(entry);
    }
}
export default Log;
