"use strict";

import { backwardsCompatifyCharacter, inflateCharacter } from "../Data/Character";
import { backwardsCompatifyCreature, inflateCreature } from "../Data/Creature";
import { backwardsCompatifyDeck, inflateDeck } from "../Data/Deck";

//2024-03-08: copied from StoryViewer

const storageName = "CharacterTracker_SaveGame";

class Storage {
    constructor() {
        this.storageName = "CharacterTracker_SaveGame";
        this.storage = {
            //list of all characters
            characterList: [],//TODO: just store the game
            //list of all cards this player has
            cardList: [],
            //list of decks this player has
            deckList: [],
        };
        this.entryCount = 0;
        this.loadStorage();
        this.saveStorage();
        let storage = this;
        let _saveStorage = this.saveStorage.bind(this);
        window.onbeforeunload = _saveStorage;
        window.onblur = _saveStorage;
        //TEST
        window.storage = this;
    }

    saveStorage() {
        let stringify = JSON.stringify(this.storage);
        localStorage.setItem(this.storageName, stringify);
    }

    loadStorage() {
        let content = localStorage.getItem(this.storageName);
        if (content == 'undefined') {
            content = null;
        }
        if (!content?.trim()) {
            content = null;
        }
        this.storage = JSON.parse(content) ?? this.storage;
        //
        this.backwardsCompatifyStorage(this.storage);
        //
        this.storage.characterList.forEach(character => {
            inflateCharacter(character);
            backwardsCompatifyCharacter(character);
        });
        this.storage.cardList.forEach(card => {
            inflateCreature(card);
            backwardsCompatifyCreature(card);
        });
        this.storage.deckList.forEach(deck => {
            inflateDeck(deck);
            backwardsCompatifyDeck(deck);
        });
    }

    backwardsCompatifyStorage(storage) {
        //Change: add deckList
        if (!storage.deckList) {
            storage.deckList = [];
        }
    }

    get characterList() {
        return this.storage.characterList;
    }
    set characterList(value) {
        this.storage.characterList = value;
    }
    get cardList() {
        return this.storage.cardList;
    }
    set cardList(value) {
        this.storage.cardList = value;
    }
}
export default Storage;
