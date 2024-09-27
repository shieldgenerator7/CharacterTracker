import logo from './logo.png';
import './App.css';
import React, { useEffect, useState } from 'react';
import Creature, { inflateCreature } from './Data/Creature';
import EditPanel from './Components/EditPanel';
import { parsePasteFromExcel } from './Utility/Parser';
import Storage from './Utility/Storage';
import { VERSION } from './Version';
import { arrayRemove, isImage } from './Utility/Utility';
import AbilityPanel from './Components/AbilityPanel';
import { rollDice } from './Data/DiceRoller';
import CharacterFrame from './Components/CharacterFrame';
import Character, { inflateCharacter } from './Data/Character';
import CommandPanel from './Components/CommandPanel';
import Log from './Data/Log';
import Game, { inflateGame } from './Data/Game';
import Consumable from './Data/Consumable';

function App() {
    //Storage
    let storage;
    let setStorage = (s) => { storage = s; };
    const defaultStorage = () => new Storage();
    [storage, setStorage] = useState(defaultStorage);
    //Character
    let character = new Character("Tak Redwind");
    let setCharacter = (c) => {
        character = c;
        storage.characterList = characterList;
    };
    const defaultCharacter = () => storage.characterList[0] ?? new Character("Tak Redwind");
    [character, setCharacter] = useState(defaultCharacter);
    window.character = character;
    let updateCharacter = (oldcharacter) => {
        let newcharacter = JSON.parse(JSON.stringify(oldcharacter));
        if (isImage(oldcharacter.imgPortrait)) {
            newcharacter.imgPortrait = oldcharacter.imgPortrait;
        }
        inflateCharacter(
            newcharacter,
            (c) => { if (c == character) { updateCharacter(c); } }
        );
        //
        let charList = [...characterList];
        if (charList.includes(oldcharacter)) {
            let index = charList.indexOf(oldcharacter);
            charList.splice(index, 1, newcharacter);
        }
        setCharacterList(charList);
        //
        setCharacter(newcharacter);
        storage.characterList = characterList;
    };

    let renameConsumablePropagation = (oldname, newname, exceptCharacter) => {
        characterList.forEach(character => {
            if (character == exceptCharacter) {
                return;
            }
            let cr = character.consumableList.find(c => c.consumableName == oldname);
            if (cr) {
                cr.consumableName = newname;
            }
        });
        setCharacterList([...characterList]);
    };

    //Game
    let game = new Game();
    let setGame = (g) => {
        game = g;
        storage.game = game;
        window.game = game;
    };
    const defaultGame = () => storage.game ?? new Game();
    [game, setGame] = useState(defaultGame);
    window.game = game;
    let updateGame = (oldgame) => {
        let newgame = JSON.parse(JSON.stringify(oldgame));
        inflateGame(newgame);
        //

        // setGame(newgame);
        game = newgame;
        storage.game = game;
        window.game = game;

    };

    //Log
    let log = new Log();
    let setLog = (l) => {
        log = l;
        storage.log = log;
    };
    const defaultLog = () => storage.log ?? new Log();
    [log, setLog] = useState(defaultLog);
    window.log = log;
    window.setLog = setLog;
    window.Log = Log;

    let updateLog = (oldlog) => {
        let newlog = JSON.parse(JSON.stringify(oldlog));
        //
        setLog(newlog);
    };
    window.updateLog = updateLog;
    window.Consumable = Consumable;

    let diceRolled = (character, rollName, rollValue, rollResult) => {
        log.recordEntryDieRoll(game, character, rollName, rollValue, rollResult);
        setLog(log);
    };
    let attributeAdjusted = (character, attributeName, oldValue, newValue) => {
        log.recordEntryAttributeAdjust(game, character, attributeName, oldValue, newValue);
        setLog(log);
    };
    let abilityModified = (character, abilityName, oldValue, newValue) => {
        //TODO: implement this
        console.warn("abilityModified not implemented yet", character, abilityName, oldValue, newValue);
    };

    // //Paste String
    // let pasteString = "";
    // let setPasteString = (s) => { pasteString = s; };
    // const defaultPasteString = () => "";
    // [pasteString, setPasteString] = useState(defaultPasteString);
    // window.pasteString = pasteString;
    // //Autodownload
    // let autoDownload = false;
    // let setAutoDownload = (b) => { autoDownload = b; };
    // const defaultAutoDownload = () => false;
    // [autoDownload, setAutoDownload] = useState(defaultAutoDownload);
    // let lastDownloadedIndex = -1;
    //Character List
    let characterList = [];
    let setCharacterList = (list) => {
        characterList = list;
        storage.characterList = characterList;
        window.characterList = characterList;
    };
    const defaultCharacterList = () => (storage.characterList.length > 0) ? storage.characterList : [character];
    [characterList, setCharacterList] = useState(defaultCharacterList);
    window.characterList = characterList;
    // //
    // if (pasteString) {
    //     let oldList = characterList;
    //     characterList = parsePasteFromExcel(pasteString);
    //     characterList.splice(0, 0, ...oldList);
    //     if (characterList.length < 1) {
    //         characterList.push(new Creature());
    //     }
    //     window.characterList = characterList;
    //     //
    //     setAutoDownload(true);
    //     autoDownload = true;
    //     for (let i = 0; i < characterList.length; i++) {
    //         setCharacter(characterList[i]);
    //     }
    //     setCharacterList([...characterList]);
    //     setAutoDownload(false);
    //     setPasteString("");
    // }
    // //Panel List
    // let panelList = [];
    // let setPanelList = (list) => { panelList = list; };
    // [panelList, setPanelList] = useState([]);
    // const openPanel = (panel, open) => {
    //     if (open) {
    //         if (!panelList.includes(panel)) {
    //             panelList.push(panel);
    //         }
    //     }
    //     else {
    //         arrayRemove(panelList, panel);
    //     }
    //     setPanelList([...panelList]);
    // };

    // useEffect(() => {
    //     let characterName = character?.getNameText(true, false);
    //     document.title = ((characterName) ? `${characterName} - ` : "") + `Creature Combat v${VERSION}`;
    // }, [character, characterList]);

    return (
        <div className="App">
            <header className="App-header">
                <div className='characterZone'>
                    {
                        characterList.map((char, i) => (
                            <CharacterFrame
                                character={char}
                                updateCharacter={(c) => updateCharacter(c)}
                                game={game}
                                updateGame={updateGame}
                                diceRolled={diceRolled}
                                attributeAdjusted={attributeAdjusted}
                                abilityModified={abilityModified}
                                characterList={characterList}
                                setCharacterList={setCharacterList}
                                renameConsumable={renameConsumablePropagation}
                                key={`character_${i}`}
                            ></CharacterFrame>
                        ))
                    }
                </div>

                <CommandPanel
                    game={game}
                    updateGame={updateGame}
                    characterList={characterList}
                    setCharacterList={setCharacterList}
                    log={log}
                ></CommandPanel>

            </header>
        </div>
    );
}

export default App;
