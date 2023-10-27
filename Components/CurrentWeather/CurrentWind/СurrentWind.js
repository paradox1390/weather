import Components from "../../Components.js";

export default class CurrentWind extends Components {
  constructor(element, { wind_kph }) {
    super(element);
    this.windSpeed = wind_kph;
  }

  createWindEl = () => {
    const img = this.createElement({ el: "div", class: ["wind__img"] });
    const divIndic = this.createElement({
      el: "div",
      class: ["wind__indicators"],
    });
    const label = this.createElement({ el: "div", class: ["params__label"] });
    divIndic.innerText = `${this.windSpeed}km/h`;
    label.innerText = "Wind Speed";
    this.containerComponents.append(img, divIndic, label);
  };

  render = () => {
    this.containerComponents.classList.add("wind__container");
    this.containerComponents.classList.add("flex-col-center");
    this.createWindEl();
    this.parentContainer.append(this.containerComponents);
  };
}
