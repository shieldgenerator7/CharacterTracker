"use strict";

"use strict";

import Attribute from "../Data/Character";
import { rollDice } from "../Data/DiceRoller";

function AttributeFrame({ attribute, character, updateCharacter }) {
    console.log("attribute.dievalue", attribute.dievalue );
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
                    attribute.dieRoll = value;
                    updateCharacter(character);
                }} value={attribute.dieRoll}></input>
                </span>
            }
            {
                !character.editAttributes &&
                <span>
            <button onClick={
                    () => {
                        let values = [];
                        for (let i = 0; i < 5; i++) {
                            let value = rollDice(attribute.dieRoll || "1d20");
                            values.push(value);
                        }
                        // values = values.sort((a, b) => a - b);
                        attribute.dievalue = values[0];
                        updateCharacter(character);
                        console.log("die roll", values, attribute.dievalue );
                    }
                }>{`${attribute.name} - ${attribute.dieRoll}`}</button>
            {attribute.dievalue}
                </span>
            }
        </div>
    );
}
export default AttributeFrame;
