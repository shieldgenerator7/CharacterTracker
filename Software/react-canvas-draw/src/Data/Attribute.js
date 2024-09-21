"use strict";

import { clamp } from "../Utility/Utility";
import { LIMIT_POSITIVE_ONLY, ONCLICK_ADJUST_VALUE, ONCLICK_DIE_ROLL, ONCLICK_TOGGLE } from "./Constants";

class Attribute {
    constructor(name) {
        this.name = name;
        this.value = 0;
        this.max = 0;
        this.onclick = ONCLICK_ADJUST_VALUE;
        this.limit = LIMIT_POSITIVE_ONLY;
        this.dieRoll = "1d20";//"d20", "2d8"
        this.visible = true;
    }

    get Value() {
        return this.value;
    }
    set Value(value) {
        if (this.max > 0) {
            this.value = clamp(value, 0, this.max);
        }
        else {
            this.value = value;
        }
    }

    get OnClickType(){
        if (this.max > 0) {
            return ONCLICK_ADJUST_VALUE;
        }
        if (this.dieRoll) {
            return ONCLICK_DIE_ROLL;
        }
        return ONCLICK_ADJUST_VALUE;
    }

    getDisplayText() {
        //type: limited resource
        switch (this.OnClickType) {
            case ONCLICK_ADJUST_VALUE:
                if (this.max > 0) {
                    return `${this.name}: ${this.value}/${this.max}`;
                }
                else {
                    return `${this.name}: ${this.value}`;
                }
                break;
            case ONCLICK_DIE_ROLL:
                let valueModStr = ((this.value > 0) ? "+" : "")+this.value;
                if (this.dieRoll == "1d20" || this.dieRoll == "d20") {
                    return `${this.name}: ${valueModStr}`;
                }
                return `${this.name}: ${this.dieRoll} ${valueModStr}`;
                break;
            default:
                return `${this.name}`;
        }
    }
}
export default Attribute;

export function inflateAttribute(attribute) {
    Object.setPrototypeOf(attribute, Attribute.prototype);
}
