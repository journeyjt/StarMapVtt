import SolarSystem from "./solar-system";
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
    for (const solarSystem of this.solarSystems) {
      await solarSystem.renderTemplate(html);
    }
  }

}
