import { StarMap } from "./star-map.js";

const starMap = new StarMap();

Hooks.once('init', async function () {
    
    CONFIG.debug.hooks = true;

    Hooks.on("canvasReady", starMap.initStarMap);
    console.log("Star Map | Ready");

    Hooks.on("renderApplication", async (app, html, data) => {
      console.log("Rendering Application | ", game.canvas);
      console.log("Current Scene | ", game.canvas.scene.name);
      
      if(game.canvas.scene.name === "StarMap"){
        await starMap.renderStarMap(app, html, data);
      } 
    });
  });