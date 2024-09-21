"use strict";

import Character from "../Data/Character";
import { rollDice } from "../Data/DiceRoller";

function CharacterFrame({ character, updateCharacter }) {
    console.log("character.dievalue", character.dievalue );
    return (
        <div className="characterFrame">
            {character.name}
            <input type="text" onChange={(e) => {
                let value = e.target.value;
                character.dieroll = value;
                updateCharacter(character);
            }}></input>
            <button onClick={
                    () => {
                        let values = [];
                        for (let i = 0; i < 5; i++) {
                            let value = rollDice(character.dieroll || "1d20");
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
