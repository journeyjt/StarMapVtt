import Sector from "./sector";
import SolarSystem from "./solar-system";

export declare class StarMap {
  private sector: Sector;

  constructor();

  addSector(sector: Sector): void;

  getSector(): Sector;

  getSolarSystem(name: string): SolarSystem;

  displaySectorInfo(): void;

  initStarMap(canvas: any): Promise<void>;

  renderStarMap(app: any, html: any, data: any): Promise<void>;
}
