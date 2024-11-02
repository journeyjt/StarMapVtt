var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Planet from "./planet.js";
export default class SolarSystem {
    constructor(name, xCoordinate, yCoordinate) {
        this.name = name;
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.id = window.generateUUID();
        this.generateRandomPlanets();
    }
    generateRandomPlanets() {
        let numberOfPlanets = window.getRandomNumber(1, 4);
        for (let i = 0; i < numberOfPlanets; i++) {
            let planetSize = window.getRandomNumber(8, 25);
            let orbitSize = window.getRandomNumber(35, 200) + (i * 10);
            let planet = new Planet(this.id, `Planet ${i + 1}`, window.getRandomNumber(10, 20), window.getRandomHexColor(), planetSize, planetSize, orbitSize, orbitSize);
            this.planets.push(planet);
        }
    }
    getName() {
        return this.name;
    }
    renderTemplate(html) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Rendering Solar System | ", this.name);
            const content = yield renderTemplate("modules/star-map/templates/star-map-solar-system.html", {});
            const parsedContent = content.replace("||solarSystemName||", this.name).replace("||solarSystemId||", this.id);
            //console.log("Content | ", parsedContent);
            const target = html.find("#star-map");
            target.append(parsedContent);
            const solarSystem = target.find(`#${this.id}`);
            console.log("Solar System | ", solarSystem);
            solarSystem.css({
                position: 'absolute',
                left: `${this.xCoordinate}px`,
                top: `${this.yCoordinate}px`
            });
            console.log("Solar System | ", solarSystem);
            this.planets.forEach((planet) => __awaiter(this, void 0, void 0, function* () {
                yield planet.renderTemplate(solarSystem);
            }));
        });
    }
}
