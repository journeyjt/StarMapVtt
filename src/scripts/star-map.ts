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

  initStarMap() {
    this.displaySectorInfo();  // Display the sector information
  }

}


