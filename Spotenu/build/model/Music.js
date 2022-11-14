"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Music = void 0;
class Music {
    id;
    name;
    albumId;
    constructor(id, name, albumId) {
        this.id = id;
        this.name = name;
        this.albumId = albumId;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getAlbum() {
        return this.albumId;
    }
}
exports.Music = Music;
