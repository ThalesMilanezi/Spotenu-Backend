"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Music = void 0;
class Music {
    constructor(id, name, album) {
        this.id = id;
        this.name = name;
        this.album = album;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getAlbum() {
        return this.album;
    }
}
exports.Music = Music;
