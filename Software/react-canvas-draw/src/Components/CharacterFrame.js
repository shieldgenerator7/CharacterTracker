"use strict";

import Character from "../Data/Character";
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

//2024-09-20: copied from Creature.inflateCreature()
export function inflateCharacter(character, updateCharacter = (c) => { }) {
    Object.setPrototypeOf(character, Character.prototype);
    // character.biomeModifiers.forEach(bm => {
    //     Object.setPrototypeOf(bm, BiomeModifier.prototype);
    // });
    character.abilityList = character.abilityList.filter(a => a);
    character.abilityList.forEach(ability => {
        // inflateAbility(ability);
    });

    //Portrait
    // if (character.imageURL && !isImage(character.imgPortrait)) {
    //     let characterImage = new Image();
    //     characterImage.src = character.imageURL;
    //     characterImage.onload = () => {
    //         character.imgPortrait = characterImage;
    //         updateCharacter(character);
    //     }
    // }
}
