import { StarMap } from "./star-map.js";

const starMap = new StarMap();

Hooks.once("ready", async function() {
    await starMap.initStarMap();  // Call the function to initialize the StarMap
    console.log("StarMap initialized");
});