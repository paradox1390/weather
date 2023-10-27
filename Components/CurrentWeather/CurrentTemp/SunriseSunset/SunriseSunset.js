import Components from "../../../Components.js";
export default class SunriseSunset extends Components {
  constructor(element, { forecast }) {
    super(element);
    this.sunrise = forecast.forecastday[0].astro.sunrise;
    this.sunset = forecast.forecastday[0].astro.sunset;
  }

  formatedSunrise = () => {
    const timeSunset = this.sunset.split(" ")[0];
    return timeSunset;
  };

  formatedSunset = () => {
    const timeSunrise = this.sunrise.split(" ")[0];
    let [hour, minutes] = timeSunrise.split(":");
    hour = +hour + 12;
    return `${hour}:${minutes}`;
  };

  sunriseCreate = () => {
    const sunriseEl = this.createElement({
      el: "div",
      class: ["sun__container"],
    });
    const sunriseImg = this.createElement({
      el: "div",
      class: ["sun__img-wrap", "sunrise__img"],
    });
    const sunriseInfo = this.createElement({
      el: "div",
      class: ["sun__info", "sunrise"],
    });
    const sunriseInfoText = this.createElement({ el: "span" });
    const sunriseInfoTime = this.createElement({
      el: "span",
      class: ["sunrise__time"],
    });

    sunriseInfoText.innerText = "Sunrise";
    sunriseInfoTime.innerText = this.formatedSunrise();

    sunriseInfo.append(sunriseInfoText, sunriseInfoTime);

    sunriseEl.append(sunriseImg, sunriseInfo);
    this.containerComponents.append(sunriseEl);
  };

  sunsetCreate = () => {
    const sunsetEl = this.createElement({
      el: "div",
      class: ["sun__container"],
    });
    const sunsetImg = this.createElement({
      el: "div",
      class: ["sun__img-wrap", "sunset__img"],
    });
    const sunsetInfo = this.createElement({
      el: "div",
      class: ["sun__info", "sunset"],
    });
    const sunsetInfoText = this.createElement({ el: "span" });
    const sunsetInfoTime = this.createElement({
      el: "span",
      class: ["sunset__time"],
    });

    sunsetInfoText.innerText = "Sunset";
    sunsetInfoTime.innerText = this.formatedSunset();

    sunsetInfo.append(sunsetInfoText, sunsetInfoTime);
    sunsetEl.append(sunsetImg, sunsetInfo);
    this.containerComponents.append(sunsetEl);
  };

  render = () => {
    this.containerComponents.classList.add("sun__wrap");
    this.sunriseCreate();
    this.sunsetCreate();
    this.parentContainer.append(this.containerComponents);
  };
}
