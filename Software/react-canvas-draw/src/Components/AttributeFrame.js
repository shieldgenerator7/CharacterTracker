"use strict";

"use strict";

import Attribute from "../Data/Character";
import { ONCLICK_TOGGLE } from "../Data/Constants";
import { rollDice } from "../Data/DiceRoller";
import { clamp } from "../Utility/Utility";
import Counter from "./Counter";

function AttributeFrame({ attribute, character, updateCharacter }) {
    console.log("attribute.dievalue", attribute.dievalue);
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
                    {attribute.max > 0 &&
                        <span>
                            {attribute.getDisplayText()}
                            <Counter
                                value={attribute.value}
                                setValue={(v) => {
                                    attribute.value = clamp(v, 0, attribute.max);
                                    updateCharacter(character);
                                }}
                                allowNegative={false}
                                inline={true}
                                min={0}
                                max={attribute.max}
                            ></Counter>
                        </span>
                    }
                        {!(attribute.max > 0) && attribute.dieRoll &&
                            <span>
                    <button onClick={
                        () => {
                            let value = rollDice(attribute.dieRoll || "1d20");
                            attribute.dievalue = value;
                            updateCharacter(character);
                        }
                    }>{`${attribute.getDisplayText()}`}</button>
                    {attribute.dievalue}
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
