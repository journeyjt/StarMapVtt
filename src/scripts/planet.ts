import { generateUUID } from "./utils.js";

export default class Planet {
    private name: string;
    private orbitSpeed: number;
    private color: string;
    private id: string;
    private orbitId: string;
    private systemId: string;
    private width: number;
    private height: number;
    private orbitWidth: number;
    private orbitHeight: number;

    constructor(systemId: string, name: string, orbitSpeed: number, color: string, width: number, height: number, orbitWidth: number, orbitHeight: number) {
        this.name = name;
        this.orbitSpeed = orbitSpeed;
        this.id = generateUUID();
        this.orbitId = generateUUID();
        this.systemId = systemId;
        this.color = color;
        this.width = width;
        this.height = height;
        this.orbitWidth = orbitWidth;
        this.orbitHeight = orbitHeight;
    }

    getName(): string {
        return this.name;
    }

    async renderTemplate(html){
        await this.renderOrbitWithPlanet(html);
    }

    async renderOrbitWithPlanet(html){
        console.log("Rendering Planet | ", this.name);
        const content = await renderTemplate("modules/star-map/templates/star-map-planet.html", {});
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
        
    }
}