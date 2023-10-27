import Components from "../../Components.js";
export default class ForecastHour extends Components {
  constructor(element, forecastHourData) {
    super(element);
    this.forecastHourData = forecastHourData;
  }
  getDayNight = () => {
    const time = this.forecastHourData.time.split(" ")[1];
    const hour = time.split(":")[0];
    return hour > 6 && hour < 20 ? "day" : "night";
  };

  formatedUrlImg = () => {
    const url = `./images/weather/forecast/${this.getDayNight()}/${
      this.forecastHourData.condition.code
    }.svg`;
    return url;
  };
  createForecastHourEl = () => {
    const spanTime = this.createElement({
      el: "span",
      class: ["forecast__hour-time"],
    });
    const imgCloud = this.createElement({
      el: "img",
      atr: [
        { src: `${this.formatedUrlImg()}` },
        { alt: `${this.forecastHourData.condition.text}` },
      ],
      class: ["forecast__hour-img"],
    });

    const spanTemp = this.createElement({
      el: "span",
      class: ["forecast__hour-temp"],
    });
    const imgWind = this.createElement({
      el: "img",
      atr: [
        { src: `./images/weather/compass.svg` },
        { alt: `wind direction to ${this.forecastHourData.wind_dir}` },
      ],
      class: [
        "forecast__hour-wind-direction",
        `${this.forecastHourData.wind_dir}`,
      ],
    });
    const spanWindSpeed = this.createElement({
      el: "span",
      class: ["forecast__hour-wind-speed"],
    });
    spanTime.innerText = this.forecastHourData.time.split(" ")[1];
    spanTemp.innerText = `${this.forecastHourData.temp_c}°C`;
    spanWindSpeed.innerText = `${this.forecastHourData.wind_kph}km/h`;

    this.containerComponents.append(
      spanTime,
      imgCloud,
      spanTemp,
      imgWind,
      spanWindSpeed
    );
  };

  render = () => {
    this.containerComponents.classList.add("forecast__hour-container");
    this.containerComponents.classList.add(this.getDayNight());
    this.createForecastHourEl();
    this.parentContainer.append(this.containerComponents);
  };
}
