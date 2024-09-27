"use strict";

import Counter from "./Counter";

function ConsumableFrame({ consumable, count, character, updateCharacter }) {
    return <div>
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
        {consumable.name}
    </div>
}
export default ConsumableFrame;