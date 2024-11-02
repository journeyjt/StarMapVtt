var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { StarMap } from "./star-map";
const starMap = new StarMap();
//game.STAR_MAP = starMap;
Hooks.once('init', function () {
    return __awaiter(this, void 0, void 0, function* () {
        CONFIG.debug.hooks = true;
        Hooks.on("canvasReady", starMap.initStarMap);
        console.log("Star Map | Ready");
        Hooks.on("renderApplication", (app, html, data) => __awaiter(this, void 0, void 0, function* () {
            if (game.canvas.scene.name === "StarMap") {
                yield starMap.renderStarMap(app, html, data);
            }
        }));
    });
});
