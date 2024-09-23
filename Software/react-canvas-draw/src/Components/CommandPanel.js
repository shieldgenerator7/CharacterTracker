"use strict";

import Field from "./Field";
import LogPanel from "./LogPanel";

function CommandPanel({ game, updateGame, log }) {
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
            <LogPanel
                log={log}
            ></LogPanel>
        </div>
    );
}
export default CommandPanel;