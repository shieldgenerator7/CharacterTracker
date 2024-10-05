"use strict";

import { useState } from "react";
import Ability, { inflateAbility } from "../Data/Ability";
import Attribute, { inflateAttribute } from "../Data/Attribute";
import Character from "../Data/Character";
import { DIE_ROLL_FLAIR_CRIT, DIE_ROLL_FLAIR_FUMBLE } from "../Data/Constants";
import Consumable from "../Data/Consumable";
import { rollDice } from "../Data/DiceRoller";
import AbilityFrame from "./AbilityFrame";
import AttributeFrame from "./AttributeFrame";
import ConsumableFrame from "./ConsumableFrame";
import Field from "./Field";
import ListOrdered from "./ListOrdered";
import SearchSelect from "./SearchSelect";
import { isString } from "../Utility/Utility";
import TempBonus from "../Data/TempBonus";
import TempBonusFrame from "./TempBonusFrame";

function CharacterFrame({ character, updateCharacter, game, updateGame, diceRolled, attributeAdjusted, abilityModified, characterList, setCharacterList, renameConsumable }) {
    let showConsumableList = false;
    let setShowConsumableList = (b) => showConsumableList = b;
    [showConsumableList, setShowConsumableList] = useState(false);
    let btnShowConsumableListId = `character_${character.name?.replaceAll(" ", "")}_showConsumableList`;
    let sltConsumableListId = `character_${character.name?.replaceAll(" ", "")}_sltConsumableList`;
    let onClickIgnoreIds = [
        btnShowConsumableListId,
        sltConsumableListId,
    ];
    return (
        <div className="characterFrame"
            onClick={(e) => {
                //early exit: id is an id set to be ignored
                if (onClickIgnoreIds.includes(e.target.id)
                    || onClickIgnoreIds.includes(e.target.parentElement?.id)
                ) {
                    return;
                }
                //close consumable list
                setShowConsumableList(false);
                // console.log("mouse event", e, e.target.id, onClickIgnoreIds);
            }}
        >
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
                            className={"editTextLong"}
                        ></Field>
                        <button onClick={(e) => {
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
                                (attr, i) => (
                                    <AttributeFrame
                                        attribute={attr}
                                        character={character}
                                        updateCharacter={updateCharacter}
                                        diceRolled={diceRolled}
                                        attributeAdjusted={attributeAdjusted}
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
                                    game={game}
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
                                (ability, i) => (
                                    <AbilityFrame
                                        ability={ability}
                                        character={character}
                                        updateFunc={() => updateCharacter(character)}
                                        diceRolled={diceRolled}
                                        attributeAdjusted={attributeAdjusted}
                                        abilityModified={abilityModified}
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
                                    updateFunc={() => updateCharacter(character)}
                                    diceRolled={diceRolled}
                                    attributeAdjusted={attributeAdjusted}
                                    abilityModified={abilityModified}
                                    key={`character_ability_${i}`}
                                ></AbilityFrame>
                            ))
                        }</>)
                    }
                </div>


                <h2>
                    Consumables
                    {!showConsumableList &&
                        <button className="addButton"
                            id={btnShowConsumableListId}
                            onClick={(e) => {
                                setShowConsumableList(true);
                            }}>+</button>
                    }
                    {showConsumableList &&
                        <SearchSelect
                            id={sltConsumableListId}
                            options={["", "NEW"].concat(game.consumableList).map(o => o.name ?? o)}
                            setOption={(option) => {
                                console.log("option selected", option);
                                let needsEdited = false;
                                let consumable = game.getConsumable(option);
                                if (!consumable) {
                                    consumable = new Consumable(option);
                                    game.consumableList.push(consumable);
                                    needsEdited = true;
                                    character.editAttributes = true;
                                    updateGame(game);
                                }
                                character.addConsumable(consumable, 1);
                                updateCharacter(character);
                                setShowConsumableList(false);
                            }}
                        ></SearchSelect>
                    }
                </h2>
                <div className={"consumableContainer"}>
                    {character.editAttributes &&
                        <ListOrdered
                            arr={character.consumableList}
                            contentFunc={
                                (consumableRef, i) => {
                                    const oldname = consumableRef.consumableName;
                                    return (
                                        <ConsumableFrame
                                            consumableReference={consumableRef}
                                            character={character}
                                            updateCharacter={updateCharacter}
                                            game={game}
                                            updateFunc={(consumable) => {
                                                consumableRef.consumableName = consumable.name;
                                                renameConsumable(oldname, consumable.name, character);
                                                updateCharacter(character);
                                                updateGame(game);
                                            }}
                                            diceRolled={diceRolled}
                                            attributeAdjusted={attributeAdjusted}
                                            abilityModified={abilityModified}
                                            key={`character_consumable_${i}`}
                                        ></ConsumableFrame>
                                    );
                                }
                            }
                            updateFunc={(arr) => {
                                character.consumableList = arr;
                                updateCharacter(character);
                            }}
                        ></ListOrdered>
                    }
                    {!character.editAttributes &&
                        (<>{
                            character.consumableList.map((consumableRef, i) => (
                                <ConsumableFrame
                                    consumableReference={consumableRef}
                                    character={character}
                                    updateCharacter={updateCharacter}
                                    game={game}
                                    updateFunc={(consumable) => {
                                        consumableRef.Name = consumable.name;
                                        updateCharacter(character);
                                        updateGame(game);
                                    }}
                                    diceRolled={diceRolled}
                                    attributeAdjusted={attributeAdjusted}
                                    abilityModified={abilityModified}
                                    key={`character_consumable_${i}`}
                                ></ConsumableFrame>
                            ))
                        }</>)
                    }
                </div>

                {!character.editAttributes &&
                    <>
                        <h2>
                            Temporary Bonuses
                            <button className="addButton"
                                onClick={(e) => {
                                    let tempBonus = new TempBonus(2, "");
                                    tempBonus.editing = true;
                                    character.tempBonusList.push(tempBonus);
                                    updateCharacter(character);
                                }}>+</button>
                        </h2>
                        {
                            <ListOrdered
                                arr={character.tempBonusList}
                                contentFunc={(tempBonus, i) => (
                                    <TempBonusFrame
                                        tempBonus={tempBonus}
                                        character={character}
                                        updateCharacter={updateCharacter}
                                        game={game}
                                        updateFunc={() => {
                                            updateCharacter(character);
                                        }}
                                        diceRolled={diceRolled}
                                        attributeAdjusted={attributeAdjusted}
                                        abilityModified={abilityModified}
                                        key={`character_tempBonus_${i}`}
                                    ></TempBonusFrame>
                                )}
                                updateFunc={(arr) => {
                                    character.tempBonusList = arr;
                                    updateCharacter(character);
                                }}
                            ></ListOrdered>
                        }
                    </>
                }
            </div>


                {
                    !character.editAttributes && character.dieRollLog?.length > 0 &&
                    <div className="diceRollLogPanel">
                        <h2>Dice Rolls
                            {
                                [
                                    "d4",
                                    "d6",
                                    "d8",
                                    "d10",
                                    "d12",
                                    "d20",
                                    "d100",
                                ].map((d,i) => (                                    
                            <button className="addButton"
                                key={`character_dieroll_${i}`}
                                onClick={(e) => {
                                    let roll = rollDice(d);
                                    diceRolled(character, d, roll.Value, roll.Value);
                                    character.dieRollLog.push(roll);
                                    character.dieRollLogSelect.length = 0;
                                    updateCharacter(character);
                                }}
                            >
                                {d}
                            </button>                                
                                ))
                            }
                            <button className="listorderedbuttonX"
                                onClick={() => {
                                    character.dieRollLog = [];
                                    character.dieRollLogSelect = [];
                                    updateCharacter(character);
                                }}>X
                            </button>
                        </h2>
                        <span className="diceRollLog">

                            {character.dieRollLog.map((roll, i) =>
                                <span
                                    className={
                                        `rollResult
                                        ${character.dieRollLogSelect.includes(i) && "rollResultSelect" || ""}
                                        ${roll.hasFlair(DIE_ROLL_FLAIR_CRIT) && "rollResultCrit" || ""}
                                        ${roll.hasFlair(DIE_ROLL_FLAIR_FUMBLE) && "rollResultFumb" || ""}
                                        `
                                    }
                                    key={`character_die_roll_log_${i}`}
                                    onClick={() => {
                                        console.log("roll", i, roll);
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
                                >
                                    {/* <div className="rollResultInternal"> */}
                                    {roll.Value}
                                    {/* <span className="rollResultName">{roll.name}</span>
                                    </div> */}
                                </span>
                            )}

                        </span>

                    </div>
                }
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
