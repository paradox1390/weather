import Components from "../Components.js";
import ForecastHour from "./ForecastHour/ForecastHour.js";
export default class ForecastHours extends Components {
  constructor(element, { forecast, location }) {
    super(element);
    this.forecastday = forecast.forecastday[0].hour;
    this.timeZone = location.tz_id;
  }

  filterHours = () => {
    const formatetLocalTIme = new Intl.DateTimeFormat("en-GB", {
      timeZone: this.timeZone,
      hour: "numeric",
    });
    const localTime = formatetLocalTIme.format(new Date());
    const arrHours = this.forecastday.filter((hour, index) => {
      const time = hour.time.split(" ")[1];
      const timeHour = time.split(":")[0];
      let deltaHour = localTime - timeHour;
      if (index % 3 === 0 && deltaHour < 3) {
        return hour;
      }
    });

    return arrHours;
  };

  renderComponents = () => {
    const header = this.createElement({
      el: "h3",
      class: ["forecast__header-hour"],
    });
    const divWrap = this.createElement({
      el: "div",
      class: ["forecast__hourly-wrap"],
    });
    const arrHours = this.filterHours();
    arrHours.forEach((hour) => {
      const forecastHour = new ForecastHour(divWrap, hour);
      forecastHour.render();
    });
    header.innerText = "Hourly Forecast:";
    this.containerComponents.append(header, divWrap);
  };

  render = () => {
    this.containerComponents.classList.add("forecast__hourly-container");
    this.containerComponents.classList.add("container");
    this.renderComponents();
    this.parentContainer.append(this.containerComponents);
  };
}
