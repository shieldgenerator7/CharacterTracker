"use strict";

class TempBonus{
    constructor(bonus, filter) {
        this.bonus = bonus;
        this.filter = filter;
    }
}
export default TempBonus;

export function inflateTempBonus(tempBonus) {
    Object.setPrototypeOf(tempBonus, TempBonus.prototype);
}