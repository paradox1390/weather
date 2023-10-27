import Components from "../../Components.js";
import SunriseSunset from "./SunriseSunset/SunriseSunset.js";
export default class CurrentTemp extends Components {
  constructor(element, storage) {
    super(element);
    this.storage = storage;
    this.current = storage.current;
  }

  renderComponents = () => {
    this.sunriseSunset = new SunriseSunset(
      this.containerComponents,
      this.storage
    );
    this.sunriseSunset.render();
  };

  render = () => {
    this.containerComponents.classList.add("temp__container");
    const tempWrap = this.createElement({
      el: "div",
      class: ["temperature__wrap"],
    });
    const spanTemp = this.createElement({
      el: "span",
      class: ["current__temp"],
    });
    const feelsLikeWrap = this.createElement({
      el: "div",
      class: ["fells-like__temp-wrap"],
    });
    const feelsLikeText = this.createElement({
      el: "span",
      class: ["fells-like"],
    });
    const feelsLikeTemp = this.createElement({
      el: "span",
      class: ["fells-like__temp"],
    });

    spanTemp.innerText = `${this.current.temp_c}°C`;
    feelsLikeText.innerText = "Feels like:";
    feelsLikeTemp.innerText = `${this.current.feelslike_c}°C`;

    feelsLikeWrap.append(feelsLikeText, feelsLikeTemp);
    tempWrap.append(spanTemp, feelsLikeWrap);
    this.containerComponents.append(tempWrap);
    this.renderComponents();
    this.parentContainer.append(this.containerComponents);
  };
}
