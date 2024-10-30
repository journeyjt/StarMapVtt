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
export class StarMap {
    constructor() {
        this.sector = new Sector("Default Sector", "This is the default sector.");
    }
    addSector(sector) {
        this.sector = sector;
    }
    getSector() {
        return this.sector;
    }
    displaySectorInfo() {
        console.log(this.sector.getInfo());
    }
    initStarMap(app, html, _) {
        return __awaiter(this, void 0, void 0, function* () {
            let scene = game.scenes.find(scene => scene.name === "StarMap");
            if (scene) {
                console.log("StarMap scene found.");
                return;
            }
            else {
                console.log("StarMap scene not found.");
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
                let content = yield renderTemplate("modules/star-map/templates/star-map.html", {});
                console.log("Loaded Content | ", content);
                let hud = html.find("#hud");
                console.log("HUD | ", hud);
                hud.append(content);
            }
        });
    }
}
