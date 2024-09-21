"use strict";

"use strict";

import Attribute from "../Data/Character";
import { rollDice } from "../Data/DiceRoller";

function AttributeFrame({ attribute, character, updateCharacter }) {
    console.log("attribute.dievalue", attribute.dievalue );
    return (
        <div className="attributeFrame">
            <input type="text" onChange={(e) => {
                let value = e.target.value;
                attribute.dieroll = value;
                updateCharacter(character);
            }}></input>
            <button onClick={
                    () => {
                        let values = [];
                        for (let i = 0; i < 5; i++) {
                            let value = rollDice(attribute.dieroll || "1d20");
                            values.push(value);
                        }
                        // values = values.sort((a, b) => a - b);
                        attribute.dievalue = values[0];
                        updateCharacter(character);
                        console.log("die roll", values, attribute.dievalue );
                    }
                }>Roll die</button>
            {attribute.dievalue}
        </div>
    );
}
export default AttributeFrame;
