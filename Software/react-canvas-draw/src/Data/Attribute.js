"use strict";

import { LIMIT_POSITIVE_ONLY, ONCLICK_ADJUST_VALUE } from "./Constants";

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