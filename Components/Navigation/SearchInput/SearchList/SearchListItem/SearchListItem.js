import Components from "../../../../Components.js";
import { FLAGS } from "../../../../../config.js";
export default class SearchListItem extends Components {
  constructor(element, city, reRender, app) {
    super(element);
    this.city = city;
    this.app = app;
    this.reRender = reRender;
  }
  containerComponents = this.createElement({
    el: "li",
    class: ["search__city"],
  });

  getFlags = () => {
    const countryFlag = FLAGS.filter((country) => {
      if (country.name === this.city.country.toLowerCase()) return country;
    });
    return countryFlag;
  };

  createSearchListItemEl = () => {
    const pCity = this.createElement({ el: "p" });
    const spanEmoji = this.createElement({ el: "span", class: ["emoji"] });
    const spanCityName = this.createElement({
      el: "span",
      class: ["search__city-name"],
    });
    const pCountryName = this.createElement({ el: "p", class: ["country"] });

    const [flag] = this.getFlags();
    spanEmoji.innerText = `${flag?.emoji ?? ""}`;
    spanCityName.innerText = `${this.city.name}`;

    pCity.append(spanEmoji, spanCityName);
    pCountryName.innerText = `${this.city.country}, ${this.city.region}`;
    this.containerComponents.append(pCity, pCountryName);
  };
  getCityForecast = async () => {
    await this.app.getdata(this.city.name);
    this.reRender();
  };
  render = () => {
    this.createSearchListItemEl();
    this.containerComponents.addEventListener("click", this.getCityForecast);
    this.parentContainer.append(this.containerComponents);
  };
}
