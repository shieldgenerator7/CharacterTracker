"use strict";

import Character, { inflateCharacter } from "../Data/Character";
import Field from "./Field";
import LogPanel from "./LogPanel";

function CommandPanel({ game, updateGame, characterList, setCharacterList, log }) {
    return (
        <div className="commandPanel">
            <div className="commandControls">
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
                <button
                    onClick={(e) => {
                        let character = new Character("New Character");
                        characterList.push(character);
                        setCharacterList(characterList);
                    }}
                >
                    New Character
                </button>
                <button
                    onClick={(e) => {
                        navigator.clipboard.readText().then(v => {
                            let clipboardText = v || "{}";
                            try {
                                let obj = JSON.parse(clipboardText);
                                if (obj.attributeList) {//TODO: make better json obj type detection
                                    let character = obj;
                                    inflateCharacter(character);
                                    character.name += " (Copy)";
                                    characterList.push(character);
                                    setCharacterList([...characterList]);
                                }
                            }
                            catch (SyntaxError) {

                            }
                        });
                    }}
                >
                    Paste Character
                </button>
                Log Entries: { (log.entryList.length > 100)?"100/":""}{log.entryList.length}
            </div>
            <LogPanel
                log={log}
            ></LogPanel>
        </div>
    );
}
export default CommandPanel;