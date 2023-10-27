import Components from "../../Components.js";
export default class CurrentUV extends Components {
  constructor(element, { uv }) {
    super(element);
    this.uv = uv;
  }
  createUVEl = () => {
    const img = this.createElement({ el: "div", class: ["uv__img"] });
    const divIndic = this.createElement({
      el: "div",
      class: ["uv__indicators"],
    });
    const label = this.createElement({ el: "div", class: ["params__label"] });
    divIndic.innerText = this.uv;
    label.innerText = "UV";
    this.containerComponents.append(img, divIndic, label);
  };
  render = () => {
    this.containerComponents.classList.add("uv__container");
    this.containerComponents.classList.add("flex-col-center");
    this.createUVEl();
    this.parentContainer.append(this.containerComponents);
  };
}
