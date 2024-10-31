import Sector from "./sector.js";
import SolarSystem from "./solar-system.js";

export class StarMap {
  private sector: Sector;

  constructor() {
    let solarSystems = [new SolarSystem("Solar System 1", 100, 100), new SolarSystem("Solar System 2", 400, 400)];
    this.sector = new Sector("Default Sector", "This is the default sector.", solarSystems);
  }

  addSector(sector: Sector) {
    this.sector = sector;
  }

  getSector(): Sector {
    return this.sector;
  }

  getSolarSystem(name: string): SolarSystem {
    return this.sector.getSolarSystems()[0];
  }

  displaySectorInfo() {
    console.log(this.sector.getInfo());
  }

  async initStarMap(canvas) {
    console.log("Initializing Star Map...");
    //console.log("Canvas | ", canvas);
    //console.log("Scene | ", canvas.scene);

    let scene = game.scenes.find(scene => scene.name === "StarMap");
    if (!scene) {
      console.log("Creating StarMap scene");

      scene = await getDocumentClass("Scene").create({
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
  }

  async renderStarMap(app, html, data) {
    console.log("Rendering Star Map...");
    await this.sector.renderTemplate(html);
  }
}


