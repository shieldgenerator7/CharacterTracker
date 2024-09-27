"use strict";

import Ability, { inflateAbility } from "./Ability";

class Consumable{
    constructor(name) {
        this.name = name;
        this.ability = new Ability(name);
    }
}
export default Consumable;

export function inflateConsumable(consumable) {
    Object.setPrototypeOf(consumable, Consumable.prototype);
    inflateAbility(consumable.ability);
}
