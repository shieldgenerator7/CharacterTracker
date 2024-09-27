"use strict";

class Game {
    constructor() {
        this.characterList = [];
        this.consumableList = [];
        this.log = undefined;
        this.event = "";
        this.location = "";
    }
}
export default Game;

export function inflateGame(game) {
    Object.setPrototypeOf(game, Game.prototype);
}

export function backwardsCompatifyGame(game) {
    game.consumableList ??= [];
}
