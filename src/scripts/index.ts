import { StarMap } from "./star-map.js";

const starMap = new StarMap();

Hooks.once('ready', async function () {
    
    Hooks.on("canvasReady", starMap.initStarMap);
    console.log("Star Map | Ready");
    
  });