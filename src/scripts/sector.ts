export class Sector {
  constructor(public name: string, public description: string) {
    this.name = name;
    this.description = description;
  }

  getInfo() {
    return `${this.name}: ${this.description}`;
  }
}
