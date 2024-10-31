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

  async initStarMap(canvas) {
    console.log("Initializing Star Map...");
    console.log("Canvas | ", canvas);
    console.log("Scene | ", canvas.scene);

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

    if(canvas.scene.name === "StarMap") {
      let content = await renderTemplate("modules/star-map/templates/star-map.html", {});
      console.log("Loaded Content | ", content);
      const html = new DOMParser().parseFromString(content, "text/html");
      console.log("Parsed HTML | ", html);
      const app = html.documentElement.getElementsByClassName("module-star-map-application")[0];
      let hud = document.querySelector("#hud");
      console.log("drawing-hud | ", hud);
      console.log("Star Map Container | ", app);
      hud?.insertAdjacentElement("beforeend", app);
    }
  }
}


