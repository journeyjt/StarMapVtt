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

  async renderTemplate(html) {
    for (const solarSystem of this.solarSystems) {
      console.log("Solar System Name: ", solarSystem.getName());
      await solarSystem.renderTemplate(html);
    }
  }

}
