import Sector from "./sector.js";

export class StarMap {
  private sector: Sector;

  constructor() {
    this.sector = new Sector("Default Sector", "This is the default sector.");
  }

  addSector(sector: Sector) {
    this.sector = sector;
  }

  getSector(): Sector {
    return this.sector;
  }

  displaySectorInfo() {
    console.log(this.sector.getInfo());
  }

  async initStarMap() {
    this.displaySectorInfo();  // Display the sector information
    let scene = game.scenes.find(scene => scene.name === "StarMap");
    if (scene) {
      console.log("StarMap scene found.");
      return;
    }
    else{

      console.log("StarMap scene not found.");

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
      let hud = html.find("#drawing-hud");
      let content = await renderTemplate("modules/star-map/templates/star-map.html", {});
      hud.append(content);
    }
  }

}


