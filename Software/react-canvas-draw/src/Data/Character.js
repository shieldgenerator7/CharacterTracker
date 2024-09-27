"use strict";

import Ability, { inflateAbility } from "./Ability";
import { inflateAttribute } from "./Attribute";
import { inflateConsumable } from "./Consumable";
import ConsumableReference from "./ConsumableReference";
import { inflateRollGroup } from "./RollGroup";

class Character {
    constructor(name) {
        this.name = name;
        this.portrait = undefined;//TODO: implement portrait
        this.attributeList = [];
        this.abilityList = [];
        this.consumableList = [];

        //TODO: implement equipment
        this.equipmentList = [];
        //TODO: implement consumables
        this.consumableList = [];

        this.restList = [];//TOOD: implement rests
        this.dieRollLog = [];
        this.dieRollLogSelect = [];
    }

    hasResource(ability) {
        let attrName = ability.resourceName.trim();
        let attr = this.attributeList
            .filter(a => a.name?.trim() == attrName || a.displayName?.trim() == attrName)[0];
        return attr && attr.value >= ability.resourceCost;
    }

    consumeResource(ability) {
        let attrName = ability.resourceName.trim();
        let attr = this.attributeList
            .filter(a => a.name?.trim() == attrName || a.displayName?.trim() == attrName)[0];
        if (attr) {
            let prevValue = attr.Value;
            attr.Value -= ability.resourceCost;
            return [prevValue, attr.Value];
        }
    }

    addConsumable(consumable, count) {
        let consumableReference = this.consumableList.find(cr => cr.consumableName == consumable.name);
        if (!consumableReference) {
            //early exit: theres none to add, and its not in the list
            if (count == 0) {
                return;
            }
            consumableReference = new ConsumableReference(consumable.name, 0);
            this.consumableList.push(consumableReference);
        }
        consumableReference.count += count;
        if (consumableReference.count <= 0 && !consumableReference.active) {
            let index = this.consumableList.indexOf(consumableReference);
            this.consumableList.splice(index, 1);
        }
    }

}
export default Character;
window.Character = Character;

//2024-09-20: copied from Creature.inflateCreature()
export function inflateCharacter(character, updateCharacter = (c) => { }) {
    Object.setPrototypeOf(character, Character.prototype);
    // character.biomeModifiers.forEach(bm => {
    //     Object.setPrototypeOf(bm, BiomeModifier.prototype);
    // });
    character.attributeList = character.attributeList.filter(a => a);
    character.attributeList.forEach(attribute => {
        inflateAttribute(attribute);
    });
    character.abilityList = character.abilityList.filter(a => a);
    character.abilityList.forEach(ability => {
        inflateAbility(ability);
    });

    character.consumableList = character.consumableList.filter(a => a);
    character.consumableList.forEach(consumable => {
        // inflateConsumable(consumable); 
    });

    character.dieRollLog = character.dieRollLog.filter(a => a);
    character.dieRollLog.forEach(rollGroup => {
        inflateRollGroup(rollGroup);
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
export function backwardsCompatifyCharacter(character) {
    character.dieRollLog ??= [];
    character.dieRollLogSelect ??= [];
}
