var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Sector from "./sector.js";
import SolarSystem from "./solar-system.js";
export default class StarMap {
    constructor() {
        let solarSystems = [new SolarSystem("Solar System 1", 100, 100), new SolarSystem("Solar System 2", 400, 400)];
        this.sector = new Sector("Default Sector", "This is the default sector.", solarSystems);
    }
    addSector(sector) {
        this.sector = sector;
    }
    getSector() {
        return this.sector;
    }
    getSolarSystem(name) {
        return this.sector.getSolarSystems()[0];
    }
    displaySectorInfo() {
        console.log(this.sector.getInfo());
    }
    initStarMap(canvas) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Initializing Star Map...");
            //console.log("Canvas | ", canvas);
            //console.log("Scene | ", canvas.scene);
            let scene = game.scenes.find(scene => scene.name === "StarMap");
            if (!scene) {
                console.log("Creating StarMap scene");
                scene = yield getDocumentClass("Scene").create({
                    name: "StarMap",
                    width: 1920,
                    height: 1080,
                    grid: 150,
                    gridColor: "#FFFFFF",
                    backgroundColor: "#000000",
                    fogExploration: false,
                    globalLight: true,
                    darkness: 0,
                    gridDistance: 1,
                    gridUnits: "AU",
                    gridType: CONST.GRID_TYPES.HEXODDR,
                    padding: 0,
                    navName: "Star Map",
                    tokenVision: true,
                    navigation: true,
                    active: false,
                    permission: { default: 0 },
                });
            }
            console.log("StarMap scene found.");
        });
    }
    renderStarMap(app, html, data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Rendering Star Map...");
            yield this.sector.renderTemplate(html);
        });
    }
}
