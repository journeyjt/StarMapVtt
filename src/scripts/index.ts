import { StarMap } from "./star-map.js";

const starMap = new StarMap();
//game.STAR_MAP = starMap;

Hooks.once('init', async function () {
    
    //CONFIG.debug.hooks = true;

    Hooks.on("canvasReady", starMap.initStarMap);
    console.log("Star Map | Ready");

    Hooks.on("renderApplication", async (app, html, data) => {      
      if(game.canvas.scene.name === "StarMap"){
        await starMap.renderStarMap(app, html, data);
      } 
    });
  });