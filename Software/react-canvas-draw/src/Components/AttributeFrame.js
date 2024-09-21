"use strict";

"use strict";

import Attribute from "../Data/Character";
import { ONCLICK_ADJUST_VALUE, ONCLICK_DIE_ROLL, ONCLICK_TOGGLE } from "../Data/Constants";
import { rollDice } from "../Data/DiceRoller";
import { clamp } from "../Utility/Utility";
import Counter from "./Counter";

function AttributeFrame({ attribute, character, updateCharacter }) {
    let onClickType = attribute.OnClickType;
    return (
        <div className="attributeFrame">
            {character.editAttributes &&
                <span>
                    <input type="text" onChange={(e) => {
                        let value = e.target.value;
                        attribute.name = value;
                        updateCharacter(character);
                    }} value={attribute.name}></input>
                    <input type="text" onChange={(e) => {
                        let value = e.target.value;
                        attribute.value = value;
                        updateCharacter(character);
                    }} value={attribute.value}></input>
                    <input type="text" onChange={(e) => {
                        let value = e.target.value;
                        attribute.max = value;
                        updateCharacter(character);
                    }} value={attribute.max}></input>
                    <input type="text" onChange={(e) => {
                        let value = e.target.value;
                        attribute.dieRoll = value;
                        updateCharacter(character);
                    }} value={attribute.dieRoll}></input>
                </span>
            }
            {
                !character.editAttributes &&
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
            }
        </div>
    );
}
export default AttributeFrame;
