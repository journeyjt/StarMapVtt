import { StarMap } from "./star-map.js";

const starMap = new StarMap();

Hooks.once('init', async function () {
    
    CONFIG.debug.hooks = true;

    Hooks.on("drawLayer", starMap.initStarMap);
    console.log("Star Map | Ready");

  });