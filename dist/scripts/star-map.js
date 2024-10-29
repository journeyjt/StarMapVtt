"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarMap = void 0;
require("@league-of-foundry-developers/foundry-vtt-types");
var StarMap = /** @class */ (function () {
    function StarMap() {
        console.log("StarMap initialized");
        Hooks.once("init", function () {
            CONFIG.debug.hooks = true;
        });
        Hooks.on("init", function () {
            console.log("This code runs once the Foundry VTT software begins its initialization workflow.");
        });
        Hooks.on("ready", function () {
            console.log("This code runs once core initialization is ready and game data is available.");
        });
    }
    return StarMap;
}());
exports.StarMap = StarMap;
