"use strict";

import { ACTION_PREV_ROLL_MODIFY, ACTION_PREV_ROLL_REROLL, ACTION_VARIABLE_MODIFY } from "../Data/Constants";
import Field from "./Field";
import SearchSelect from "./SearchSelect";

function AbilityFrame({ ability, character, updateCharacter, attributeAdjusted, abilityModified }) {
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
                            ACTION_PREV_ROLL_MODIFY,
                            ACTION_PREV_ROLL_REROLL,
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
                        if (ability.ConsumesResource) {
                            let res = character.consumeResource(ability);
                            if (res[0] != res[1]) {
                                attributeAdjusted(character, `${ability.resourceName} (${ability.name})`, res[0], res[1]);
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
