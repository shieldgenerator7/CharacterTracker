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
                        let value = rollDice(attribute.dieRoll || "1d20");
                        attribute.dievalue = value;
                        updateCharacter(character);
                    }
                }>{`${attribute.name} - ${attribute.dieRoll}`}</button>
            {attribute.dievalue}
                </span>
            }
        </div>
    );
}
export default AttributeFrame;
