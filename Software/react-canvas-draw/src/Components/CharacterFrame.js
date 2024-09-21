"use strict";

import Attribute from "../Data/Attribute";
import Character from "../Data/Character";
import { rollDice } from "../Data/DiceRoller";
import AttributeFrame from "./AttributeFrame";

function CharacterFrame({ character, updateCharacter }) {
    return (
        <div className="characterFrame">
            {character.name}
            <div className={"attributeContainer"}>
            {
                character.attributeList.map((attr, i) => (
                    <AttributeFrame
                        attribute={attr}
                        character={character}
                        updateCharacter={updateCharacter}
                        key={`character_attribute_${i}`}
                    ></AttributeFrame>
                ))
            }
                </div>
            <button onClick={(e) => {
                let attr = new Attribute("attr");
                character.editAttributes = !character.editAttributes;
                updateCharacter(character);
            }}>Edit Attributes</button>
            {character.editAttributes
                &&
                <button onClick={(e) => {
                    let attr = new Attribute("attr");
                    character.attributeList.push(attr);
                    character.editAttributes = true;
                    updateCharacter(character);
                }}>New Attribute</button>
            }
            {
                !character.editAttributes && character.dieRollLog?.length > 0 &&
                <span>
                    <button onClick={() => {
                        character.dieRollLog = [];
                        updateCharacter(character);
                    }}>Clear Die Roll Log</button>
                    {character.dieRollLog.map((roll, i) =>
                        <span className={"rollResult"} key={`character_die_roll_log_${i}`}>{roll}</span>
                    )}

                </span>

            }
        </div>
    );
}
export default CharacterFrame;
