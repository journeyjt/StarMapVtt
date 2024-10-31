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
    initStarMap(canvas) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Initializing Star Map...");
            console.log("Canvas | ", canvas);
            console.log("Scene | ", canvas.scene);
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
            if (canvas.scene.name === "StarMap") {
                let app = document.getElementsByClassName("module-star-map-application")[0];
                console.log("Star Map App | ", app);
                if (!app) {
                    let content = yield renderTemplate("modules/star-map/templates/star-map.html", {});
                    console.log("Loaded Content | ", content);
                    const html = new DOMParser().parseFromString(content, "text/html");
                    console.log("Parsed HTML | ", html);
                }
                let hud = document.querySelector("#hud");
                console.log("drawing-hud | ", hud);
                let starMapContainer = html.documentElement.getElementsByClassName("module-star-map-application")[0];
                console.log("Star Map Container | ", starMapContainer);
                hud === null || hud === void 0 ? void 0 : hud.insertAdjacentElement("beforeend", starMapContainer);
            }
        });
    }
}
