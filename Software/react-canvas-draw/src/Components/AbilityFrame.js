"use strict";

import { ACTION_ROLL_MODIFY, ACTION_ROLL_REROLL, ACTION_VARIABLE_MODIFY } from "../Data/Constants";
import { rollDice } from "../Data/DiceRoller";
import { isString } from "../Utility/Utility";
import Field from "./Field";
import SearchSelect from "./SearchSelect";

function AbilityFrame({ ability, character, updateCharacter, attributeAdjusted, abilityModified, diceRolled, extraButtons }) {
    if (character.editAttributes) {
        return (
            <div className="abilityFrameEdit">
                <div className="abilityFrameLine">
                    <Field
                        name={"Ability"}
                        value={ability.name}
                        setValue={(value) => {
                            abilityModified(character, `${ability.name}_name`, ability.name, value);
                            ability.name = value;
                            updateCharacter(character);
                        }}
                        className={"editText"}
                    ></Field>
                    <Field
                        name={"Description"}
                        value={ability.description}
                        setValue={(value) => {
                            abilityModified(character, `${ability.name}_description`, ability.description, value);
                            ability.description = value;
                            updateCharacter(character);
                        }}
                        className={"editTextLong"}
                    ></Field>
                </div>
                <div className="abilityFrameLine">
                    <Field
                        name={"Resource Name"}
                        value={ability.resourceName}
                        setValue={(value) => {
                            abilityModified(character, `${ability.name}_resourceName`, ability.resourceName, value);
                            ability.resourceName = value;
                            updateCharacter(character);
                        }}
                        className={"editText"}
                    ></Field>
                    <Field
                        name={"Cost"}
                        value={ability.resourceCost}
                        setValue={(value) => {
                            abilityModified(character, `${ability.name}_resourceCost`, ability.resourceCost, value);
                            ability.resourceCost = value;
                            updateCharacter(character);
                        }}
                        className={"editNumber"}
                    ></Field>
                    <SearchSelect
                        options={[
                            ACTION_ROLL_MODIFY,
                            ACTION_ROLL_REROLL,
                            ACTION_VARIABLE_MODIFY
                        ]}
                        option={ability.action}
                        setOption={(value) => {
                            abilityModified(character, `${ability.name}_action`, ability.action, value);
                            ability.action = value;
                            updateCharacter(character);
                        }}
                    ></SearchSelect>
                </div>

                <div className="abilityFrameLine">
                    <Field
                        name={"Bonus"}
                        value={ability.dieRollBonus}
                        setValue={(value) => {
                            abilityModified(character, `${ability.name}_dieRollBonus`, ability.dieRollBonus, value);
                            ability.dieRollBonus = value;
                            updateCharacter(character);
                        }}
                        className={"editNumber"}
                    ></Field>
                    <Field
                        name={"Filter"}
                        value={ability.dieRollAttributeFilter}
                        setValue={(value) => {
                            abilityModified(character, `${ability.name}_dieRollAttributeFilter`, ability.dieRollAttributeFilter, value);
                            ability.dieRollAttributeFilter = value;
                            updateCharacter(character);
                        }}
                        className={"editText"}
                    ></Field>
                    {extraButtons}
                </div>
            </div>
        );
    }
    else {
        let disabled = (!ability.Active && ability.ConsumesResource && !character.hasResource(ability))
            ? true
            : false;
        return (
            <div className=
                {
                    `abilityDisplay 
                    ${(ability.Active) ? "abilityDisplayActive" : ""}
                    ${(disabled) ? "abilityDisplayDisabled" : ""}`
                }
                disabled={disabled}
                onClick={(e) => {
                    if (disabled) { return; }
                    ability.Active = !ability.Active;
                    if (ability.Active) {
                        let resourceAllGood = true;
                        if (ability.ConsumesResource) {
                            resourceAllGood = false;
                            let res = character.consumeResource(ability);
                            if (res[0] != res[1]) {
                                attributeAdjusted(character, `${ability.resourceName} (${ability.name})`, res[0], res[1]);
                                resourceAllGood = true;
                            }
                        }
                        if (resourceAllGood) {
                            if (character.dieRollLogSelect.length > 0) {
                                switch (ability.action) {
                                    case ACTION_ROLL_MODIFY:
                                        character.dieRollLogSelect.forEach(rollIndex => {
                                            let roll = character.dieRollLog[rollIndex];
                                            //early exit: no roll
                                            if (!roll) {
                                                console.error("no roll at index!", rollIndex, character.name, character);
                                                return;
                                            }
                                            //2024-09-25: copied from AttributeFrame
                                            //roll ability dice, if applicable
                                            let ablname = `${roll.name} (+${ability.name})`;
                                            //early exit: attribute filter
                                            if (ability.dieRollAttributeFilter) {
                                                if (ability.dieRollAttributeFilter != roll.name) {
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

                                        break;
                                    case ACTION_ROLL_REROLL:
                                        console.warn("ACTION_ROLL_REROLL not implemented");
                                        break;
                                    case ACTION_VARIABLE_MODIFY:
                                        console.warn("ACTION_VARIABLE_MODIFY not implemented");
                                        break;
                                }
                            }
                        }
                    }
                    updateCharacter(character);
                }}
            >
                <span className="abilityName">{ability.name}
                    {
                        (ability.resourceName && ability.resourceCost > 0)
                            ? ` (${ability.resourceCost} ${ability.resourceName})`
                            : ""
                    }
                    :
                </span>
                <span className="abilityDescription">
                    {ability.description?.trim()}
                </span>
            </div>
        );
    }
}
export default AbilityFrame;
