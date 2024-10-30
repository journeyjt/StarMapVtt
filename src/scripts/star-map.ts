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
        width: 800,
        height: 600,
        grid: 1,
        gridColor: "#000000",
        backgroundColor: "#FFFFFF",
        navigation: true,
        active: false,
        permission: { default: 0 },
      });
    }
  }

}


