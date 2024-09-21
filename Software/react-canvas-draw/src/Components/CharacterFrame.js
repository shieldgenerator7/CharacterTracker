"use strict";

import { rollDice } from "../Data/DiceRoller";

function CharacterFrame({ character, updateCharacter }) {
    console.log("character.dievalue", character.dievalue );
    return (
        <div className="characterFrame">
            {character.name}
            <button onClick={
                    () => {
                        let values = [];
                        for (let i = 0; i < 5; i++) {
                            let value = rollDice("2d8");
                            values.push(value);
                        }
                        // values = values.sort((a, b) => a - b);
                        character.dievalue = values[0];
                        updateCharacter(character);
                        console.log("die roll", values, character.dievalue );
                    }
                }>Roll die</button>
            {character.dievalue}
        </div>
    );
}
export default CharacterFrame;
