"use strict";

import Attribute from "../Data/Attribute";
import Character from "../Data/Character";
import { rollDice } from "../Data/DiceRoller";
import AttributeFrame from "./AttributeFrame";
import Field from "./Field";

function CharacterFrame({ character, updateCharacter }) {
    return (
        <div className="characterFrame">
            <div className="characterContent">
                {!character.editAttributes &&
                    <>
                        <h1>{character.name}</h1>
                        <h2>Attributes</h2>
                    </>
                }
                {character.editAttributes &&
                    <Field
                        name={"Character Name"}
                        value={character.name}
                        setValue={(v) => {
                            character.name = v;
                            updateCharacter(character);
                        }}
                        className={"editText"}
                    ></Field>
                }
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

                {
                    !character.editAttributes && character.dieRollLog?.length > 0 &&
                    <>
                        <h2>Dice Rolls</h2>
                    <span className="diceRollLog">

                        {character.dieRollLog.map((roll, i) =>
                            <span className={"rollResult"} key={`character_die_roll_log_${i}`}>{roll}</span>
                        )}

                    </span>

                    </>
                }
            </div>
            <div className="buttonPanel">
                <button onClick={(e) => {
                    let attr = new Attribute("attr");
                    character.editAttributes = !character.editAttributes;
                    updateCharacter(character);
                }}>{(character.editAttributes)?"OK":"EDIT"}</button>
                {character.editAttributes
                    &&
                    <button onClick={(e) => {
                        let attr = new Attribute("attr");
                        character.attributeList.push(attr);
                        character.editAttributes = true;
                        updateCharacter(character);
                    }}>NEW ATTRIBUTE</button>
                }
                {!character.editAttributes && character.dieRollLog?.length > 0 &&
                    <button onClick={() => {
                        character.dieRollLog = [];
                        updateCharacter(character);
                    }}>CLEAR DIE ROLL LOG</button>
                }{ }
            </div>
        </div>
    );
}
export default CharacterFrame;
