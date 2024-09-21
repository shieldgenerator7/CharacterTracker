"use strict";

"use strict";

import Attribute from "../Data/Character";
import { ONCLICK_ADJUST_VALUE, ONCLICK_DIE_ROLL, ONCLICK_TOGGLE } from "../Data/Constants";
import { rollDice } from "../Data/DiceRoller";
import { clamp } from "../Utility/Utility";
import Counter from "./Counter";
import Field from "./Field";

function AttributeFrame({ attribute, character, updateCharacter }) {
    let onClickType = attribute.OnClickType;
    if (character.editAttributes) {
        return (
            <div className="attributeFrameEdit">
                <Field
                    name={"Attribute"}
                    value={attribute.name}
                    setValue={(value) => {
                        attribute.name = value;
                        updateCharacter(character);
                    }}
                    className={"editText"}
                ></Field>
                <Field
                    name={"Display"}
                    value={attribute.displayName}
                    setValue={(value) => {
                        attribute.displayName = value;
                        updateCharacter(character);
                    }}
                    className={"editTextShort"}
                ></Field>
                <Field
                    name={"Val"}
                    value={attribute.value}
                    setValue={(value) => {
                        attribute.value = value;
                        updateCharacter(character);
                    }}
                    className={"editNumber"}
                ></Field>
                <Field
                    name={"Max"}
                    value={attribute.max}
                    setValue={(value) => {
                        attribute.max = value;
                        updateCharacter(character);
                    }}
                    className={"editNumber"}
                ></Field>
                <Field
                    name={"Die Roll"}
                    value={attribute.dieRoll}
                    setValue={(value) => {
                        attribute.dieRoll = value;
                        updateCharacter(character);
                    }}
                    className={"editTextShort"}
                ></Field>
            </div>
        );
    }
    else if (attribute.IsSpacer) {
        return (
            <div>--------</div>
        )
    }
    else {
        return (
            <div className="attributeFrame">
                <span>
                    {onClickType == ONCLICK_ADJUST_VALUE &&
                        <span>
                            <Counter
                                value={attribute.value}
                                setValue={(v) => {
                                    attribute.value = v;
                                    updateCharacter(character);
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
                                        value += attribute.value * 1;
                                        character.dieRollLog ??= [];
                                        character.dieRollLog.push(value);
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
