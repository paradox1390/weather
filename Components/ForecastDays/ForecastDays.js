import Components from "../Components.js";
import ForecastDay from "./ForecastDay/ForecastDay.js";
export default class ForecastDays extends Components {
  constructor(element, { forecastday }) {
    super(element);
    this.forecastday = forecastday;
  }
  renderComponets = () => {
    const header = this.createElement({
      el: "h3",
      class: ["forecast__header"],
    });
    const divWrap = this.createElement({
      el: "div",
      class: ["forecast__days-wrap"],
    });
    this.forecastday.forEach((day) => {
      const forecastDay = new ForecastDay(divWrap, day);
      forecastDay.render();
    });
    header.innerText = `${this.forecastday.length} Days Forecast:`;
    this.containerComponents.append(header, divWrap);
  };

  render = () => {
    this.containerComponents.classList.add("forecast__days-container");
    this.containerComponents.classList.add("container");
    this.renderComponets();
    this.parentContainer.append(this.containerComponents);
  };
}
