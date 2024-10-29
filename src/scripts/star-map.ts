import "@league-of-foundry-developers/foundry-vtt-types"

export function initStarMap() {

  console.log("StarMap initialized");

  Hooks.once("init", function() {
    CONFIG.debug.hooks = true;
  });
  
  Hooks.on("init", function() {
      console.log("This code runs once the Foundry VTT software begins its initialization workflow.");
    });
    
  Hooks.on("ready", function() {
      console.log("This code runs once core initialization is ready and game data is available.");
    });
};

initStarMap();  // Call the function to initialize the StarMap
