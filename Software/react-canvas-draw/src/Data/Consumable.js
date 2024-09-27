"use strict";

import Ability, { inflateAbility } from "./Ability";
import Attribute, { inflateAttribute } from "./Attribute";

class Consumable{
    constructor(name) {
        this.name = name;
        this.attribute = new Attribute(name, 0, 0, 0);
        this.ability = new Ability(name);
    }
}
export default Consumable;

export function inflateConsumable(consumable) {
    Object.setPrototypeOf(consumable, Consumable.prototype);
    inflateAttribute(consumable.attribute);
    inflateAbility(consumable.ability);
}
