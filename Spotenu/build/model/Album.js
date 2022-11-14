"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Album = void 0;
class Album {
    id;
    name;
    band;
    constructor(id, name, band) {
        this.id = id;
        this.name = name;
        this.band = band;
    }
    getid() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getBand() {
        return this.band;
    }
}
exports.Album = Album;
