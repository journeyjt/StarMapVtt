function generateUUID(): string { // Public Domain/MIT
  let d: number = new Date().getTime();//Timestamp
  let d2: number = (typeof performance !== 'undefined' && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
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

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomHexColor() {
  let hex = Math.floor(Math.random() * 16777215).toString(16);
  return `#${hex.padStart(6, '0')}`;
}

class Planet {
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

  async renderTemplate(html: any){
      await this.renderOrbitWithPlanet(html);
  }

  async renderOrbitWithPlanet(html: any){
      console.log("Rendering Planet | ", this.name);
      const content = await renderTemplate("modules/star-map/templates/star-map-planet.html", {});
      const parsedContent = content.replace("||solarSystemOrbitId||", this.id).replace("||solarSystemPlanetId||", this.name);
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
      
  }
}

class SolarSystem {
  private name: string;
  private xCoordinate: number;
  private yCoordinate: number;
  private id: string;
  private anchorId: string;
  private planets: Array<Planet>;

  constructor(name: string, xCoordinate: number, yCoordinate: number) {
      this.name = name;
      this.xCoordinate = xCoordinate;
      this.yCoordinate = yCoordinate;
      this.id = generateUUID();
      this.anchorId = generateUUID();
      this.generateRandomPlanets();
  }

  private generateRandomPlanets() {
      this.planets = [];
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
      const parsedContent = content.replace("||solarSystemName||", this.name).replace("||solarSystemAnchorId||", this.anchorId).replace("||solarSystemId||", this.id);
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

class Sector {
  private name: string;
  private description: string;
  private solarSystems: SolarSystem[];

  constructor(name: string, description: string, solarSystems: SolarSystem[] = []) {
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

  getSolarSystem(name: string): SolarSystem | undefined { 
    return this.solarSystems.find(solarSystem => solarSystem.getName() === name);
  }

  async renderTemplate(html: any) {
    console.log("Rendering Sector | ", this.name);
    const content = await renderTemplate("modules/star-map/templates/star-map.html", {});
    const target = html.find("#chat-bubbles");
    target.before(content);
    this.solarSystems.forEach(async solarSystem => {
      await solarSystem.renderTemplate(html);
    });
  }

}

class StarMap {
  private sector: Sector;

  constructor() {
    let solarSystems = [new SolarSystem("Solar System 1", 100, 100), new SolarSystem("Solar System 2", 400, 400)];
    this.sector = new Sector("Default Sector", "This is the default sector.", solarSystems);
  }

  addSector(sector: Sector) {
    this.sector = sector;
  }

  getSector(): Sector {
    return this.sector;
  }

  getSolarSystem(name: string): SolarSystem {
    return this.sector.getSolarSystems()[0];
  }

  displaySectorInfo() {
    console.log(this.sector.getInfo());
  }

  async initStarMap(canvas) {
    console.log("Initializing Star Map...");
    //console.log("Canvas | ", canvas);
    //console.log("Scene | ", canvas.scene);

    let scene: Scene | undefined = game.scenes.find(scene => scene.name === "StarMap");
    if (!scene) {
      console.log("Creating StarMap scene");

      scene = await getDocumentClass("Scene").create({
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
  }

  async renderStarMap(app: any, html: any, data: any) {
    if(this.sector){  
      console.log("Rendering Star Map...");
      await this.sector.renderTemplate(html);
    }
    else {
      console.log("No sector found.");  
    }
  }
}


const starMap = new StarMap();

Hooks.once('init', async function () {
    
    CONFIG.debug.hooks = true;

    Hooks.on("canvasReady", starMap.initStarMap);
    console.log("Star Map | Ready");

    Hooks.on("renderApplication", async (app, html, data) => {      
      if(game.canvas.scene.name === "StarMap"){
        await starMap.renderStarMap(app, html, data);
      } 
    });
  });
 