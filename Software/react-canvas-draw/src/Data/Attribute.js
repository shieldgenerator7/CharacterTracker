"use strict";

import { LIMIT_POSITIVE_ONLY, ONCLICK_ADJUST_VALUE } from "./Constants";

class Attribute {
    constructor(name) {
        this.name = name;
        this.value = 0;
        this.max = 0;
        this.onclick = ONCLICK_ADJUST_VALUE;
        this.limit = LIMIT_POSITIVE_ONLY;
        this.dieRoll = undefined;//"d20", "2d8"
        this.visible = true;
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
    }
}
export default Attribute;

export function inflateAttribute(attribute) {
    Object.setPrototypeOf(attribute, Attribute.prototype);
}
