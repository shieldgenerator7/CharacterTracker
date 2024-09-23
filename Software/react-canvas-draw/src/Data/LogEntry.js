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
        //"2024-09-23 03:08 - 2024-04-15 @Crownspire: Tak Redwind Health: 20 -> 18 (-2)"
        let entries = Object.entries(this.variableChangeList);
        if (entries.length > 0) {
            let retStr = `${this.Date} ${this.Time} - ${this.event} @${this.location}: ${this.characterName}: `;
            retStr += entries.map(obj => {
                let name = obj[0];
                let v = obj[1];
                let diff = v.newVal - v.oldVal;
                return `${name}: ${v.oldVal} -> ${v.newVal} (${(diff>0)?"+":""}${diff})`;
            }).join("; ");
            return retStr;
        }
        //"2024-09-22 22:18 - 2024-04-15 @Crownspire: Tak Redwind Attack: 15 -> 17"
        return `${this.Date} ${this.Time} - ${this.event} @${this.location}: ${this.characterName} ${this.rollName}: ${this.rollValue} -> ${this.rollResult}`;
    }
}
export default LogEntry;
