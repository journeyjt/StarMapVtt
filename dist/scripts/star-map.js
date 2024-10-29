import { Sector } from "./sector";
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
        // Hooks.once("init", function() {
        //   CONFIG.debug.hooks = true;
        // });
        // This code runs once the Foundry VTT software begins its initialization workflow.
        Hooks.on("init", function () {
            console.log("This code runs once the Foundry VTT software begins its initialization workflow.");
        });
        // "This code runs once core initialization is ready and game data is available."
        Hooks.on("ready", function () {
            console.log("This code runs once core initialization is ready and game data is available.");
        });
        console.log("StarMap initialized");
    }
}
const starMap = new StarMap(); // Create an instance of StarMap
starMap.initStarMap(); // Call the function to initialize the StarMap
starMap.displaySectorInfo(); // Display the sector information
