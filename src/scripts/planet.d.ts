declare module "planet" {
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

        constructor(
            systemId: string,
            name: string,
            orbitSpeed: number,
            color: string,
            width: number,
            height: number,
            orbitWidth: number,
            orbitHeight: number
        );

        getName(): string;

        renderTemplate(html: any): Promise<void>;

        renderOrbitWithPlanet(html: any): Promise<void>;
    }
}
