"use strict";

import AbilityFrame from "./AbilityFrame";
import Counter from "./Counter";
import Field from "./Field";

function ConsumableFrame({ consumable, consumablename, count, character, updateCharacter, game, updateFunc, attributeAdjusted, abilityModified, diceRolled }) {
    if (!consumable) {
        return `Consumable not found! ${consumablename}`;
    }
    return <div>
        {!character.editAttributes &&
            <div>
        <Counter
            value={count}
            setValue={(v) => {
                let diff = v - count;
                character.addConsumable(consumable, diff);
                updateCharacter(character);
            }}
            label={`x${count}`}
            inline={true}
        ></Counter>
        <AbilityFrame
            title={"Consumable"}
            ability={consumable.ability}
            updateFunc={() => {
                consumable.Name = consumable.ability.name;
                updateFunc(consumable);
            }}
            character={character}
            attributeAdjusted={attributeAdjusted}
            abilityModified={abilityModified}
            diceRolled={diceRolled}
            showResourceCost={false}
            inline={true}
        ></AbilityFrame>
            </div>
        }
        {character.editAttributes &&
            <div>
                <AbilityFrame
                    title={"Consumable"}
                    ability={consumable.ability}
                    updateFunc={() => {
                        consumable.Name = consumable.ability.name;
                        updateFunc(consumable);
                    }}
                    character={character}
                    attributeAdjusted={attributeAdjusted}
                    abilityModified={abilityModified}
                    diceRolled={diceRolled}
                    showResourceCost={false}
                ></AbilityFrame>
            </div>
        }
    </div>
}
export default ConsumableFrame;