"use strict";

import Ability, { inflateAbility } from "../Data/Ability";
import Attribute, { inflateAttribute } from "../Data/Attribute";
import Character from "../Data/Character";
import { rollDice } from "../Data/DiceRoller";
import AbilityFrame from "./AbilityFrame";
import AttributeFrame from "./AttributeFrame";
import Field from "./Field";
import ListOrdered from "./ListOrdered";

function CharacterFrame({ character, updateCharacter, diceRolled, attributeAdjusted, abilityModified, characterList, setCharacterList }) {
    return (
        <div className="characterFrame">
            <div className="characterContent">
                <h1>{character.name}</h1>
                {character.editAttributes &&
                    <>
                    <Field
                        name={"Character Name"}
                        value={character.name}
                        setValue={(v) => {
                            character.name = v;
                            updateCharacter(character);
                        }}
                        className={"editText"}
                    ></Field>
                    <button onClick={(e)=>{
                    let json = JSON.stringify(character);
                    navigator.clipboard.writeText(json);
                    }} >Copy Character</button>
                    </>
                }
                {character.editAttributes &&
                    characterList.indexOf(character) >= 0 &&
                    
                    <button
                        onClick={(e) => {
                            let index = characterList.indexOf(character);
                            if (index >= 0) {
                                characterList.splice(index, 1);
                                setCharacterList([...characterList]);
                            }
                        }}
                    >Delete Character</button>
                }
                <h2>Attributes</h2>
                <div className={"attributeContainer"}>
                    {character.editAttributes &&
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
                    }
                    {!character.editAttributes &&

                        (<>{
                            character.attributeList.map((attr, i) => (
                                <AttributeFrame
                                    attribute={attr}
                                    character={character}
                                    updateCharacter={updateCharacter}
                                    diceRolled={diceRolled}
                                    attributeAdjusted={attributeAdjusted}
                                    key={`character_attribute_${i}`}
                                ></AttributeFrame>
                            ))
                        }</>)
                    }
                </div>
                <h2>Abilities</h2>
                <div className={"abilityContainer"}>
                    {character.editAttributes &&
                        <ListOrdered
                            arr={character.abilityList}
                            contentFunc={
                                (ability, i, extraButtons) => (
                                    <AbilityFrame
                                        ability={ability}
                                        character={character}
                                        updateCharacter={updateCharacter}
                                        diceRolled={diceRolled}
                                        attributeAdjusted={attributeAdjusted}
                                        abilityModified={abilityModified}
                                        extraButtons={extraButtons}
                                        key={`character_ability_${i}`}
                                    ></AbilityFrame>
                                )
                            }
                            updateFunc={(arr) => {
                                character.abilityList = arr;
                                updateCharacter(character);
                            }}
                        ></ListOrdered>
                    }
                    {!character.editAttributes &&

                        (<>{
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
                        }</>)
                    }
                </div>

                {
                    !character.editAttributes && character.dieRollLog?.length > 0 &&
                    <>
                        <h2>Dice Rolls
                            <button className="listorderedbuttonX"
                                onClick={() => {
                        character.dieRollLog = [];
                        updateCharacter(character);
                                }}>X
                                </button>
                        </h2>
                        <span className="diceRollLog">

                            {character.dieRollLog.map((roll, i) =>
                                <span
                                    className={`rollResult ${character.dieRollLogSelect.includes(i) && "rollResultSelect" || ""}`}
                                    key={`character_die_roll_log_${i}`}
                                    onClick={() => {
                                        let selected = character.dieRollLogSelect.includes(i);
                                        //Deselect
                                        if (selected) {
                                            let index = character.dieRollLogSelect.indexOf(i);
                                            character.dieRollLogSelect.splice(index, 1);
                                        }
                                        //Select
                                        else {
                                            character.dieRollLogSelect.push(i);
                                        }
                                        updateCharacter(character);
                                    }}
                                >{roll.Value}</span>
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
                {character.editAttributes &&
                    <button onClick={(e) => {
                        navigator.clipboard.readText().then(v => {
                            let clipboardText = v || "{}";
                            try {
                            let obj = JSON.parse(clipboardText);
                            //Attribute
                            if (obj.value != undefined) {//TODO: improve type detection
                                let attr = obj;
                                inflateAttribute(attr);
                                character.attributeList.push(attr);
                                character.editAttributes = true;
                                updateCharacter(character);
                            }
                            //Ability
                            if (obj.description != undefined) {//TODO: improve type detection
                                let ability = obj;
                                inflateAbility(ability);
                                character.abilityList.push(ability);
                                character.editAttributes = true;
                                updateCharacter(character);
                            }
                            }
                            catch (SyntaxError) {
                                
                            }
                        });
                    }}>PASTE</button>
                }
            </div>
        </div>
    );
}
export default CharacterFrame;
