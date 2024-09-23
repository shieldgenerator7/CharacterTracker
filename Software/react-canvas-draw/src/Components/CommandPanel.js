"use strict";

import Field from "./Field";
import LogPanel from "./LogPanel";

function CommandPanel({ game, updateGame, log }) {
    return (
        <div className="commandPanel">
            <div>
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
            <LogPanel
                log={log}
            ></LogPanel>
        </div>
    );
}
export default CommandPanel;