import SolarSystem from "./solar-system";

declare module "./sector" {
  export default class Sector {
    private name: string;
    private description: string;
    private solarSystems: SolarSystem[];

    constructor(name: string, description: string, solarSystems?: SolarSystem[]);

    getInfo(): string;

    getSolarSystems(): SolarSystem[];

    getSolarSystem(name: string): SolarSystem | undefined;

    renderTemplate(html: any): Promise<void>;
  }
}
