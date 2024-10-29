import { StarMap } from "./star-map.js";

const starMap = new StarMap();

Hooks.once("ready", function() {
    starMap.initStarMap();  // Call the function to initialize the StarMap
    starMap.displaySectorInfo();  // Display the sector information
    console.log("StarMap initialized");
});