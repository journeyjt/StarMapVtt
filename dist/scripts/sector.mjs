var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class Sector {
    constructor(name, description, solarSystems = []) {
        this.name = name;
        this.description = description;
        this.solarSystems = solarSystems;
    }
    getInfo() {
        return `${this.name}: ${this.description}`;
    }
    getSolarSystems() {
        return this.solarSystems;
    }
    getSolarSystem(name) {
        return this.solarSystems.find(solarSystem => solarSystem.getName() === name);
    }
    renderTemplate(html) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Rendering Sector | ", this.name);
            const content = yield renderTemplate("modules/star-map/templates/star-map.html", {});
            const target = html.find("#chat-bubbles");
            target.before(content);
            this.solarSystems.forEach((solarSystem) => __awaiter(this, void 0, void 0, function* () {
                yield solarSystem.renderTemplate(html);
            }));
        });
    }
}
