"use strict";

const ONCLICK_ADJUST_VALUE = 0;
const ONCLICK_DIE_ROLL = 1;

const LIMIT_POSITIVE_ONLY = 0;
const LIMIT_POSITIVE_AND_NEGATIVE = 1;
const LIMIT_NEGATIVE_ONLY = 2;

class Attribute{
    constructor(name) {
        this.name = name;
        this.value = 0;
        this.max = 0;
        this.onclick = ONCLICK_ADJUST_VALUE;
        this.limit = LIMIT_POSITIVE_ONLY;
        this.dieRoll = undefined;//"d20", "2d8"
        this.visible = true;
    }
}
export default Attribute;