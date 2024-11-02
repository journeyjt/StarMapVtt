import SolarSystem from "./solar-system.mjs";

export default class Sector {
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

  async renderTemplate(html) {
    console.log("Rendering Sector | ", this.name);
    const content = await renderTemplate("modules/star-map/templates/star-map.html", {});
    const target = html.find("#chat-bubbles");
    target.before(content);
    this.solarSystems.forEach(async solarSystem => {
      await solarSystem.renderTemplate(html);
    });
  }

}
