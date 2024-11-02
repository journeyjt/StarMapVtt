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
    constructor(name, xCoordinate, yCoordinate) {
        this.name = name;
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.id = this.generateUUID();
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
            solarSystem.click(() => {
                console.log(`Clicked on ${this.name} x: ${this.xCoordinate} y: ${this.yCoordinate}`);
            });
            solarSystem.css({
                position: 'absolute',
                left: `${this.xCoordinate}px`,
                top: `${this.yCoordinate}px`
            });
            console.log("Solar System | ", solarSystem);
        });
    }
    generateUUID() {
        let d = new Date().getTime(); //Timestamp
        let d2 = (typeof performance !== 'undefined' && performance.now && (performance.now() * 1000)) || 0; //Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16; //random number between 0 and 15
            if (d > 0) { //Use timestamp until depleted
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            }
            else { //Use microseconds since page-load if supported
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
}
