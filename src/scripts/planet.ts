
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
        this.id = this.generateUUID();
        this.orbitId = this.generateUUID();
        this.systemId = systemId;
        this.color = color;
        this.width = width;
        this.height = height;
        this.orbitWidth = orbitWidth;
        this.orbitHeight = orbitHeight;
    }

    generateUUID(): string { // Public Domain/MIT
        let d = new Date().getTime();//Timestamp
        let d2 = (typeof performance !== 'undefined' && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          let r = Math.random() * 16;//random number between 0 and 15
          if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
          } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
          }
          return (c==='x' ? r : (r&0x3|0x8)).toString(16);
        });
    }
    
    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    getRandomHexColor() {
        let hex = Math.floor(Math.random() * 16777215).toString(16);
        return `#${hex.padStart(6, '0')}`;
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