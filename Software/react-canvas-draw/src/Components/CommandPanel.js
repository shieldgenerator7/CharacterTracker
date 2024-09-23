"use strict";

import Field from "./Field";

function CommandPanel({ game, updateGame }) {
    game ??= { event: "TEST" };
    updateGame ??= (game) => { };
    return (
        <div className="commandPanel">
            <Field
                name="Event"
                value={game.event}
                setValue={(v) => {
                    game.event = v;
                    updateGame(game);
                }}
                className="editText"
                placeHolder="Event"
            ></Field>
        </div>
    );
}
export default CommandPanel;