var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class SolarSystem {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    renderTemplate(html) {
        return __awaiter(this, void 0, void 0, function* () {
            let content = yield renderTemplate("modules/star-map/templates/star-map.html", {});
            console.log("Loaded Content | ", content);
            const template = new DOMParser().parseFromString(content, "text/html");
            console.log("Parsed HTML | ", template);
            const starApp = template.documentElement.getElementsByClassName("module-star-map-application")[0];
            let hud = html.querySelector("#hud");
            console.log("drawing-hud | ", hud);
            console.log("Star Map Container | ", starApp);
            hud === null || hud === void 0 ? void 0 : hud.insertAdjacentElement("beforeend", starApp);
        });
    }
}
