import Components from "../../Components.js";

export default class CurrentPressure extends Components {
  constructor(element, { pressure_mb }) {
    super(element);
    this.pressure = pressure_mb;
  }

  createPressureEl = () => {
    const img = this.createElement({ el: "div", class: ["pressure__img"] });
    const divIndic = this.createElement({
      el: "div",
      class: ["pressure__indicators"],
    });
    const label = this.createElement({ el: "div", class: ["params__label"] });
    divIndic.innerText = `${Math.round(this.pressure / 1.333)}hPa`;
    label.innerText = "Pressure";
    this.containerComponents.append(img, divIndic, label);
  };

  render = () => {
    this.containerComponents.classList.add("pressure__container");
    this.containerComponents.classList.add("flex-col-center");
    this.createPressureEl();
    this.parentContainer.append(this.containerComponents);
  };
}
