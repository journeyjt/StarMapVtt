import Planet from "planet";
import { generateUUID, getRandomNumber, getRandomHexColor } from "./utils";

declare module "./solar-system" {
    export default class SolarSystem {
        private name: string;
        private xCoordinate: number;
        private yCoordinate: number;
        private id: string;
        private planets: Array<Planet>;

        constructor(name: string, xCoordinate: number, yCoordinate: number);

        private generateRandomPlanets(): void;

        getName(): string;

        renderTemplate(html: any): Promise<void>;
    }
}
