"use strict";

import { ACTION_PREV_ROLL_MODIFY, ONCLICK_TOGGLE } from "./Constants";

class Ability {
    constructor(name) {
        this.name = name;
        this.description = "";

        //resource
        this.resourceName = undefined;
        this.resourceCost = 0;

        //on click
        this.onclick = ONCLICK_TOGGLE;
        this.action = ACTION_PREV_ROLL_MODIFY;

        //effect
        this.dieRollBonus = 0;
        this.dieRollAttributeFilter = undefined;//"Attack" or other attribute

        //runtime vars
        this.active = false;

    }
}
export default Ability;
