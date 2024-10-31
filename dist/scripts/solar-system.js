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
            console.log("Rendering Solar System | ", this.name);
            let content = yield renderTemplate("modules/star-map/templates/star-map.html", {});
            const parsedContent = content.replace("||solarSystemName||", this.name);
            //console.log("Content | ", parsedContent);
            let target = html.find("#chat-bubbles");
            target.before(parsedContent);
        });
    }
}
