"use strict";

import { arraySum } from "../Utility/Utility";

class RollGroup{
    constructor(rollList = []) {
        this.rollList = rollList;
    }

    get Name() {
        return this.rollList[0].name;
    }

    get Value() {
        return arraySum(this.rollList, roll => roll.value);
    }

    get Result() {
        return arraySum(this.rollList, roll => roll.result);
    }
}
export default RollGroup;
