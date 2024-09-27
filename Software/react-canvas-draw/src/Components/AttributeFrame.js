"use strict";

"use strict";

import Attribute from "../Data/Character";
import { ACTION_ROLL_MODIFY, ONCLICK_ADJUST_VALUE, ONCLICK_DIE_ROLL, ONCLICK_TOGGLE } from "../Data/Constants";
import { rollDice } from "../Data/DiceRoller";
import RollGroup from "../Data/RollGroup";
import { clamp, isString } from "../Utility/Utility";
import Counter from "./Counter";
import Field from "./Field";

function AttributeFrame({ attribute, character, updateCharacter, diceRolled, attributeAdjusted }) {
    let onClickType = attribute.OnClickType;
    //Edit Attributes
    if (character.editAttributes) {
        return (
            <div className="attributeFrameEdit">
                <Field
                    name={"Attribute"}
                    value={attribute.name}
                    setValue={(value) => {
                        attributeAdjusted(character, `${attribute.name}_name`, attribute.name, value);
                        attribute.name = value;
                        updateCharacter(character);
                    }}
                    className={"editText"}
                ></Field>
                <Field
                    name={"Display"}
                    value={attribute.displayName}
                    setValue={(value) => {
                        attributeAdjusted(character, `${attribute.name}_displayname`, attribute.displayName, value);
                        attribute.displayName = value;
                        updateCharacter(character);
                    }}
                    className={"editTextShort"}
                    placeHolder={attribute.name}
                ></Field>
                <Field
                    name={"Val"}
                    value={attribute.value}
                    setValue={(value) => {
                        attributeAdjusted(character, attribute.name, attribute.value, value);
                        attribute.value = value;
                        updateCharacter(character);
                    }}
                    className={"editNumber"}
                ></Field>
                <Field
                    name={"Max"}
                    value={attribute.max}
                    setValue={(value) => {
                        attributeAdjusted(character, `${attribute.name}_max`, attribute.max, value);
                        attribute.max = value;
                        updateCharacter(character);
                    }}
                    className={"editNumber"}
                ></Field>
                <Field
                    name={"Die Roll"}
                    value={attribute.dieRoll}
                    setValue={(value) => {
                        attributeAdjusted(character, `${attribute.name}_dieRoll`, attribute.dieRoll, value);
                        attribute.dieRoll = value;
                        updateCharacter(character);
                    }}
                    className={"editTextShort"}
                ></Field>
            </div>
        );
    }
    //Show spacer
    else if (attribute.IsSpacer) {
        return (
            <div></div>
        );
    }
    //Button controls
    else {
        return (
            <div className="attributeFrame">
                <span>
                    {onClickType == ONCLICK_ADJUST_VALUE &&
                        <span>
                            <Counter
                                value={attribute.value}
                                setValue={(v) => {
                                    let oldValue = attribute.value;
                                    attribute.value = v;
                                    updateCharacter(character);
                                    attributeAdjusted(character, attribute.name, oldValue, v);
                                }}
                                allowNegative={false}
                                inline={true}
                                min={0}
                                max={attribute.max}
                                label={attribute.getDisplayText()}
                            ></Counter>
                        </span>
                    }
                    {onClickType == ONCLICK_DIE_ROLL &&
                        <span>
                            <button className={"plusMinus"}
                                onClick={
                                    () => {
                                        let roll = rollDice(attribute.dieRoll || "1d20");
                                        roll.name = attribute.name;
                                        let originalResult = roll.Value;
                                        roll.addRoll(attribute.name, attribute.value * 1);
                                        diceRolled(character, attribute.name, originalResult, roll.Value);
                                        //roll ability dice, if applicable
                                        character.abilityList
                                            .filter(ability => ability.Active && ability.action == ACTION_ROLL_MODIFY)
                                            .forEach(ability => {
                                                let ablname = `${attribute.name} (+${ability.name})`;
                                                //early exit: attribute filter
                                                if (ability.dieRollAttributeFilter) {
                                                    if (ability.dieRollAttributeFilter != attribute.name) {
                                                        return;
                                                    }
                                                }
                                                //bonus: dice roll
                                                if (("" + ability.dieRollBonus).includes("d")) {
                                                    let bonusroll = rollDice(ability.dieRollBonus);
                                                    bonusroll.name = ability.name;
                                                    bonusroll.rollList.forEach(roll => roll.name += ` ${ability.name}`);
                                                    roll.rollList = roll.rollList.concat(bonusroll.rollList);
                                                    diceRolled(character, ablname, bonusroll.Value, roll.Value);
                                                }
                                                //bonus: constant
                                                else if (ability.dieRollBonus * 1 > 0) {
                                                    let bonusvalue = ability.dieRollBonus * 1;
                                                    roll.addRoll(ability.name, bonusvalue);
                                                    diceRolled(character, ablname, bonusvalue, roll.Value);
                                                }
                                                //bonus: Attribute
                                                else if (isString(ability.dieRollBonus)) {
                                                    let attrName = ability.dieRollBonus.trim();
                                                    let attr = character.attributeList
                                                        .filter(a => a.name?.trim() == attrName || a.displayName?.trim() == attrName)[0];
                                                    if (attr?.value) {
                                                        let bonusvalue = attr.value * 1;
                                                        roll.addRoll(`${attr.name} (${ability.name})`, bonusvalue);
                                                        diceRolled(character, ablname, bonusvalue, roll.Value);
                                                    }
                                                }
                                            });

                                        //
                                        character.dieRollLog.push(roll);
                                        character.dieRollLogSelect.length = 0;
                                        character.dieRollLogSelect.push(character.dieRollLog.length - 1);
                                        updateCharacter(character);
                                    }
                                }
                                onContextMenu={
                                    (e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        updateCharacter(character);
                                        return false;
                                    }
                                }
                            >{`${attribute.getDisplayText()}`}</button>
                        </span>
                    }
                    {
                        attribute.OnClickType == ONCLICK_TOGGLE &&
                        <span>
                            {attribute.getDisplayText()}
                        </span>
                    }
                </span>
            </div>
        );
    }
}
export default AttributeFrame;
