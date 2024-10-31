export default class SolarSystem {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    async renderTemplate(html){
        let content = await renderTemplate("modules/star-map/templates/star-map.html", {});
        content.replace("{{solarSystemName}}", this.name);
        console.log("Loaded Content | ", content);
        // const template = new DOMParser().parseFromString(content, "text/html");
        // console.log("Parsed HTML | ", template);
        // const starApp = template.documentElement.getElementsByClassName("module-star-map-application")[0];
        // let hud = html.querySelector("#hud");
        // console.log("drawing-hud | ", hud);
        // console.log("Star Map Container | ", starApp);
        // hud?.insertAdjacentElement("beforeend", starApp);
        let target = html.find("#chat-bubbles");
        target.before(content);
        console.log("Content inserted before chat bubbles");
    }
  }
