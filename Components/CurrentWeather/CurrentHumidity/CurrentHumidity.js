import Components from "../../Components.js";

export default class CurrentHumidity extends Components {
  constructor(element, { humidity }) {
    super(element);
    this.humidity = humidity;
  }
  createHumidityEl = () => {
    const img = this.createElement({ el: "div", class: ["humidity__img"] });
    const divIndic = this.createElement({
      el: "div",
      class: ["humidity__indicators"],
    });
    const label = this.createElement({ el: "div", class: ["params__label"] });
    divIndic.innerText = `${this.humidity}%`;
    label.innerText = "Humidity";
    this.containerComponents.append(img, divIndic, label);
  };
  render = () => {
    this.containerComponents.classList.add("humidity__container");
    this.containerComponents.classList.add("flex-col-center");
    this.createHumidityEl();
    this.parentContainer.append(this.containerComponents);
  };
}
