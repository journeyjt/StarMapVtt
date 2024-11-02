import Planet from "./planet";
import { generateUUID, getRandomNumber, getRandomHexColor } from "./utils";


export default class SolarSystem {
    private name: string;
    private xCoordinate: number;
    private yCoordinate: number;
    private id: string;
    private planets: Array<Planet>;

    constructor(name: string, xCoordinate: number, yCoordinate: number) {
        this.name = name;
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.id = generateUUID();
        this.generateRandomPlanets();
    }

    private generateRandomPlanets() {
        let numberOfPlanets = getRandomNumber(1, 4);
        for (let i = 0; i < numberOfPlanets; i++) {
            let planetSize = getRandomNumber(8, 25);
            let orbitSize = getRandomNumber(35, 200) +  (i * 10);
            let planet = new Planet(this.id, `Planet ${i + 1}`, getRandomNumber(10, 20), getRandomHexColor(), planetSize, planetSize, orbitSize, orbitSize);
            this.planets.push(planet);
        }
    }

    getName(): string {
        return this.name;
    }

    async renderTemplate(html){
        console.log("Rendering Solar System | ", this.name);
        const content = await renderTemplate("modules/star-map/templates/star-map-solar-system.html", {});
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

        this.planets.forEach(async planet => {
           await planet.renderTemplate(solarSystem);
        });
    }
}
