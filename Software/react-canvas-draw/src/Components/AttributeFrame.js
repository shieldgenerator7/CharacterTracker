"use strict";

"use strict";

import Attribute from "../Data/Character";
import { ACTION_PREV_ROLL_MODIFY, ONCLICK_ADJUST_VALUE, ONCLICK_DIE_ROLL, ONCLICK_TOGGLE } from "../Data/Constants";
import { rollDice } from "../Data/DiceRoller";
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
                <button onClick={() => {
                    let index = character.attributeList.indexOf(attribute);
                    if (index < character.attributeList.length - 1) {
                        character.attributeList.splice(index, 1);
                        character.attributeList.splice(index + 1, 0, attribute);
                        updateCharacter(character);
                    }
                }}>&darr;</button>
                <button onClick={() => {
                    let index = character.attributeList.indexOf(attribute);
                    if (index > 0) {
                        character.attributeList.splice(index, 1);
                        character.attributeList.splice(index - 1, 0, attribute);
                        updateCharacter(character);
                    }
                }}>&uarr;</button>
                <button onClick={() => {
                    let index = character.attributeList.indexOf(attribute);
                    if (index > 0) {
                        character.attributeList.splice(index, 1);
                        updateCharacter(character);
                    }
                }}>X</button>
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
                                        let value = rollDice(attribute.dieRoll || "1d20");
                                        let result = value + attribute.value * 1;
                                        character.dieRollLog ??= [];
                                        character.dieRollLog.push(result);
                                        
                                        diceRolled(character, attribute.name, value, result);
                                        //roll ability dice, if applicable
                                        character.abilityList
                                            .filter(ability => ability.Active && ability.action == ACTION_PREV_ROLL_MODIFY)
                                            .forEach(ability => {
                                                let ablname = `${attribute.name} (+${ability.name})`
                                                //early exit: attribute filter
                                                if (ability.dieRollAttributeFilter) {
                                                    if (ability.dieRollAttributeFilter != attribute.name) {
                                                        return;
                                                    }
                                                }
                                                //bonus: dice roll
                                                if (("" + ability.dieRollBonus).includes("d")) {
                                                    let bonusvalue = rollDice(ability.dieRollBonus);
                                                    let bonusresult = bonusvalue + result;
                                                    character.dieRollLog.push(bonusvalue);
                                                    diceRolled(character, ablname, bonusvalue, bonusresult);
                                                }
                                                //bonus: constant
                                                else if (ability.dieRollBonus * 1 > 0) {
                                                    let bonusvalue = ability.dieRollBonus * 1;
                                                    let bonusresult = bonusvalue + result;
                                                    diceRolled(character, ablname, bonusvalue, bonusresult);
                                                }
                                                //bonus: Attribute
                                                else if (isString(ability.dieRollBonus)) {
                                                    let attrName = ability.dieRollBonus.trim();
                                                    let attr = character.attributeList
                                                        .filter(a => a.name.trim() == attrName || a.displayName.trim() == attrName);
                                                    if (attr?.value) {
                                                        let bonusvalue = attr.value * 1;
                                                        let bonusresult = bonusvalue + result;
                                                        diceRolled(character, ablname, bonusvalue, bonusresult);
                                                    }
                                                }
                                            });
                                        //
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
