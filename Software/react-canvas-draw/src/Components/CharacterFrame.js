"use strict";

import Attribute from "../Data/Attribute";
import Character from "../Data/Character";
import { rollDice } from "../Data/DiceRoller";
import AttributeFrame from "./AttributeFrame";

function CharacterFrame({ character, updateCharacter }) {
    console.log("character.dievalue", character.dievalue);
    return (
        <div className="characterFrame">
            {character.name}
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
                character.dieRollLog?.length > 0 &&
                character.dieRollLog.map(roll => 
                    <span class="rollResult">{roll}</span>
                )
            }
        </div>
    );
}
export default CharacterFrame;
