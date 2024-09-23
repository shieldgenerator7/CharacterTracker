"use strict";

import { getDate, getTime } from "../Utility/Utility";

class LogEntry {
    constructor(character, rollName) {
        this.dateTime = Date.now();
        this.event = "";
        this.location = "";
        this.characterName = character.name;
        this.rollName = rollName;
        this.rollValue = 0;
        this.rollResult = 0;
        this.variableChangeList = {};

    }

    get Date() {
        return getDate(this._dateTime);
    }
    get Time() {
        return getTime(this._dateTime);
    }

    recordVariableChange(name, oldVal, newVal) {
        let entry = this.variableChangeList[name];
        if (!entry) {
            entry = this.variableChangeList[name] = {
                oldVal: oldVal,
                newVal: newVal,
            };
        }
        entry.newVal = newVal;
    }

    get DisplayText() {
        //TODO: add variable changes
        //"2024-09-22 22:18 - 2024-04-15 @Crownspire: Tak Redwind Attack: 15 -> 17"
        return `${this.Date} ${this.Time} - ${this.event} @${this.location}: ${this.characterName} ${this.rollName}: ${this.rollValue} -> ${this.rollResult}`;
    }
}
export default LogEntry;
