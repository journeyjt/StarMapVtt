export default class SolarSystem {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    async renderTemplate(html){
        console.log("Rendering Solar System | ", this.name);
        let content = await renderTemplate("modules/star-map/templates/star-map.html", {});
        const parsedContent = content.replace("||solarSystemName||", this.name);
        console.log("Content | ", parsedContent);
        let target = html.find("#chat-bubbles");
        target.before(parsedContent);
    }
  }
