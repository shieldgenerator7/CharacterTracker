"use strict";

class Character{
    constructor(name) {
        this.name = name;
        this.portrait = undefined;//TODO: implement portrait
        this.attributeList = [];
        this.abilityList = [];

        //TODO: implement equipment
        this.equipmentList = [];
        //TODO: implement consumables
        this.consumableList = [];

        this.restList = [];//TOOD: implement rests
    }


}
export default Character;

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
