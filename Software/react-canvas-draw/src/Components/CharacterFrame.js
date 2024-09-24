"use strict";

import Ability from "../Data/Ability";
import Attribute from "../Data/Attribute";
import Character from "../Data/Character";
import { rollDice } from "../Data/DiceRoller";
import AbilityFrame from "./AbilityFrame";
import AttributeFrame from "./AttributeFrame";
import Field from "./Field";
import ListOrdered from "./ListOrdered";

function CharacterFrame({ character, updateCharacter, diceRolled, attributeAdjusted, abilityModified }) {
    return (
        <div className="characterFrame">
            <div className="characterContent">
                <h1>{character.name}</h1>
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
                <h2>Attributes</h2>
                <div className={"attributeContainer"}>
                        <ListOrdered
                            arr={character.attributeList}
                            contentFunc={
                                (attr, i, extraButtons) => (
                            <AttributeFrame
                                attribute={attr}
                                character={character}
                                updateCharacter={updateCharacter}
                                diceRolled={diceRolled}
                                attributeAdjusted={attributeAdjusted}
                                extraButtons={extraButtons}
                                key={`character_attribute_${i}`}
                            ></AttributeFrame>
                                )
                            }
                        updateFunc={(arr) => {
                            character.attributeList = arr;
                            updateCharacter(character);
                        }}
                        ></ListOrdered>
                </div>
                <h2>Abilities</h2>
                <div className={"abilityContainer"}>
                    {
                        character.abilityList.map((ability, i) => (
                            <AbilityFrame
                                ability={ability}
                                character={character}
                                updateCharacter={updateCharacter}
                                diceRolled={diceRolled}
                                attributeAdjusted={attributeAdjusted}
                                abilityModified={abilityModified}
                                key={`character_ability_${i}`}
                            ></AbilityFrame>
                        ))
                    }
                </div>

                {
                    !character.editAttributes && character.dieRollLog?.length > 0 &&
                    <>
                        <h2>Dice Rolls</h2>
                        <span className="diceRollLog">

                            {character.dieRollLog.map((roll, i) =>
                                <span className={"rollResult"} key={`character_die_roll_log_${i}`}
                                    onClick={() => {
                                        character.dieRollLog.splice(i, 1);
                                        updateCharacter(character);
                                    }}
                                >{roll}</span>
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
                }}>{(character.editAttributes) ? "OK" : "EDIT"}</button>
                {character.editAttributes
                    &&
                    <button onClick={(e) => {
                        let attr = new Attribute("attr");
                        character.attributeList.push(attr);
                        character.editAttributes = true;
                        updateCharacter(character);
                    }}>NEW ATTRIBUTE</button>
                }
                {character.editAttributes
                    &&
                    <button onClick={(e) => {
                        let ability = new Ability("ability");
                        character.abilityList.push(ability);
                        character.editAttributes = true;
                        updateCharacter(character);
                    }}>NEW ABILITY</button>
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
