import Components from "../../Components.js";

export default class CityName extends Components {
  constructor(element, { name }) {
    super(element);
    this.name = name;
  }
  containerComponents = this.createElement({ el: "p", class: ["city__name"] });
  render = () => {
    this.containerComponents.innerText = "";
    this.containerComponents.innerText = this.name;
    this.parentContainer.append(this.containerComponents);
  };
}
