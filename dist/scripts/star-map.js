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
    initStarMap() {
        this.displaySectorInfo(); // Display the sector information
    }
}
