"use strict";

import Ability, { inflateAbility } from "../Data/Ability";
import Attribute, { inflateAttribute } from "../Data/Attribute";
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
