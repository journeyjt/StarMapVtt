export default class SolarSystem {
    private name: string;
    private xCoordinate: number;
    private yCoordinate: number;

    constructor(name: string, xCoordinate: number, yCoordinate: number) {
        this.name = name;
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
    }

    getName(): string {
        return this.name;
    }

    async renderTemplate(html){
        console.log("Rendering Solar System | ", this.name);
        let content = await renderTemplate("modules/star-map/templates/star-map-solar-system.html", {});
        const parsedContent = content.replace("||solarSystemName||", this.name).replace("||solarSystemId||", this.name);
        //console.log("Content | ", parsedContent);
        let target = html.find("#star-map");
        target.append(parsedContent);
        const solarSystem = html.find(`#${this.name}`);
        solarSystem.click(() => {
            console.log(`Clicked on ${this.name} x: ${this.xCoordinate} y: ${this.yCoordinate}`)
        });
        solarSystem.style.Left = this.xCoordinate;
        solarSystem.style.Top = this.yCoordinate;
    }
}
