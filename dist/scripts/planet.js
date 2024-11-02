var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class Planet {
    constructor(systemId, name, orbitSpeed, color, width, height, orbitWidth, orbitHeight) {
        this.name = name;
        this.orbitSpeed = orbitSpeed;
        this.id = this.generateUUID();
        this.orbitId = this.generateUUID();
        this.systemId = systemId;
        this.color = color;
        this.width = width;
        this.height = height;
        this.orbitWidth = orbitWidth;
        this.orbitHeight = orbitHeight;
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
    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    getRandomHexColor() {
        let hex = Math.floor(Math.random() * 16777215).toString(16);
        return `#${hex.padStart(6, '0')}`;
    }
    getName() {
        return this.name;
    }
    renderTemplate(html) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.renderOrbitWithPlanet(html);
        });
    }
    renderOrbitWithPlanet(html) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Rendering Planet | ", this.name);
            const content = yield renderTemplate("modules/star-map/templates/star-map-planet.html", {});
            const parsedContent = content.replace("||solarSystemOrbitId||", this.id).replace("||solarSystemPlanetId||", this.name);
            //console.log("Content | ", parsedContent);
            const target = html.find(`#${this.systemId}`);
            target.append(parsedContent);
            const planet = target.find(`#${this.id}`);
            console.log("Planet | ", planet);
            planet.css({
                width: `${this.width}px`,
                height: `${this.height}}px`,
                background: `${this.color}`,
                position: `absolute`,
                top: `10%`
            });
            const orbit = target.find(`#${this.orbitId}`);
            orbit.css({
                position: `absolute`,
                width: `${this.orbitWidth}px`,
                height: `${this.orbitHeight}px`,
                border: `1px solid #474747`,
                'border-radius': `50%`,
                '-webkit-animation': `spin ${this.orbitSpeed}s linear infinite reverse`,
                '-moz-animation': `spin ${this.orbitSpeed}s linear infinite reverse`,
                'animation': `spin ${this.orbitSpeed}s linear infinite reverse`,
            });
        });
    }
}
