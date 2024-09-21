"use strict";

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

    get OnClickType(){
        if (this.max > 0) {
            return ONCLICK_ADJUST_VALUE;
        }
        if (this.dieRoll) {
            return ONCLICK_DIE_ROLL;
        }
        return ONCLICK_TOGGLE;//?? not sure what the default should be
    }

    getDisplayText() {
        //type: limited resource
        if (this.max > 0) {
            return `${this.name} - ${this.value}/${this.max}`;
        }
        //type: die roll
        if (this.dieRoll) {
            return `${this.name} - ${this.dieRoll}`;
        }
        if (this.value > 0) {
            return `${this.name} - ${this.value}`;
        }

        
        return `${this.name}`;
    }
}
export default Attribute;

export function inflateAttribute(attribute) {
    Object.setPrototypeOf(attribute, Attribute.prototype);
}
