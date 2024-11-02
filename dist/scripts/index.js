var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function generateUUID() {
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
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomHexColor() {
    let hex = Math.floor(Math.random() * 16777215).toString(16);
    return `#${hex.padStart(6, '0')}`;
}
class Planet {
    constructor(systemId, name, orbitSpeed, color, width, height, orbitWidth, orbitHeight) {
        this.name = name;
        this.orbitSpeed = orbitSpeed ? orbitSpeed : 20;
        this.id = generateUUID();
        this.orbitId = `${this.id}-orbit`;
        this.systemId = systemId;
        this.color = color ? color : getRandomHexColor();
        this.width = width ? width : 10;
        this.height = height ? height : 10;
        this.orbitWidth = orbitWidth ? orbitWidth : 50;
        this.orbitHeight = orbitHeight ? orbitHeight : 50;
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
            const parsedContent = content.replace("||solarSystemOrbitId||", this.orbitId).replace("||solarSystemPlanetId||", this.id);
            console.log("Content | ", parsedContent);
            const target = html.find(`#${this.systemId}`);
            console.log("Target Solar System | ", target);
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
class SolarSystem {
    constructor(name, xCoordinate, yCoordinate) {
        this.name = name;
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.id = generateUUID();
        this.anchorId = generateUUID();
        this.generateRandomPlanets();
    }
    generateRandomPlanets() {
        this.planets = [];
        let numberOfPlanets = getRandomNumber(1, 4);
        for (let i = 0; i < numberOfPlanets; i++) {
            let planetSize = getRandomNumber(8, 25);
            let orbitSize = getRandomNumber(35, 200) + (i * 10);
            let planet = new Planet(this.id, `Planet ${i + 1}`, getRandomNumber(10, 20), getRandomHexColor(), planetSize, planetSize, orbitSize, orbitSize);
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
            const parsedContent = content.replace("||solarSystemName||", this.name).replace("||solarSystemAnchorId||", this.anchorId).replace("||solarSystemId||", this.id);
            //console.log("Content | ", parsedContent);
            const target = html.find("#star-map");
            target.append(parsedContent);
            const solarSystem = target.find(`#${this.anchorId}`);
            //console.log("Solar System | ", solarSystem);
            solarSystem.css({
                position: 'absolute',
                left: `${this.xCoordinate}px`,
                top: `${this.yCoordinate}px`
            });
            console.log("Solar System | ", solarSystem);
            this.planets.forEach((planet) => __awaiter(this, void 0, void 0, function* () {
                yield planet.renderTemplate(html);
            }));
        });
    }
}
class Sector {
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
class StarMap {
    constructor() {
        let solarSystems = [new SolarSystem("Solar System 1", 100, 100), new SolarSystem("Solar System 2", 400, 400)];
        this.sector = new Sector("Default Sector", "This is the default sector.", solarSystems);
    }
    addSector(sector) {
        this.sector = sector;
    }
    getSector() {
        return this.sector;
    }
    getSolarSystem(name) {
        return this.sector.getSolarSystems()[0];
    }
    displaySectorInfo() {
        console.log(this.sector.getInfo());
    }
    initStarMap(canvas) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Initializing Star Map...");
            //console.log("Canvas | ", canvas);
            //console.log("Scene | ", canvas.scene);
            let scene = game.scenes.find(scene => scene.name === "StarMap");
            if (!scene) {
                console.log("Creating StarMap scene");
                scene = yield getDocumentClass("Scene").create({
                    name: "StarMap",
                    width: 1920,
                    height: 1080,
                    grid: 150,
                    gridColor: "#FFFFFF",
                    backgroundColor: "#000000",
                    fogExploration: false,
                    globalLight: true,
                    darkness: 0,
                    gridDistance: 1,
                    gridUnits: "AU",
                    gridType: CONST.GRID_TYPES.HEXODDR,
                    padding: 0,
                    navName: "Star Map",
                    tokenVision: true,
                    navigation: true,
                    active: false,
                    permission: { default: 0 },
                });
            }
            console.log("StarMap scene found.");
        });
    }
    renderStarMap(app, html, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.sector) {
                console.log("Rendering Star Map...");
                yield this.sector.renderTemplate(html);
            }
            else {
                console.log("No sector found.");
            }
        });
    }
}
const starMap = new StarMap();
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
