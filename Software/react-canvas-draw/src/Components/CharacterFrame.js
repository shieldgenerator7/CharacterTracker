"use strict";

import { rollDice } from "../Data/DiceRoller";

function CharacterFrame({ character, setCharacter }) {
    let dievalues = [1,2,3];
    return (
        <div className="characterFrame">
            {character.name}
            <button onClick={
                    () => {
                        let values = [];
                        for (let i = 0; i < 50; i++) {
                            let value = rollDice("2d8");
                            values.push(value);
                        }
                        values = values.sort((a, b) => a - b);
                        dievalues = values;
                        console.log("die roll", values);
                        character.dievalues = values;
                        setCharacter(character);
                    }
                }>Roll die</button>
            {character.dievalues}
        </div>
    );
}
export default CharacterFrame;
