import { KEY } from "./config.js";
import { DEFAULT_CITY } from "./config.js";
import Components from "./Components/Components.js";
import WeatherApi from "./services/WeatherApi.js";
import Info from "./Components/Info/Info.js";
import CurrentWeather from "./Components/CurrentWeather/CurrentWeather.js";
import ForecastDays from "./Components/ForecastDays/ForecastDays.js";
import ForecastHours from "./Components/ForecastHours/ForecastHours.js";
import Store from "./Store/Store.js";
import Navigation from "./Components/Navigation/Navigation.js";
export default class App extends Components {
  constructor(element) {
    super(element);
    this.store = new Store();
    this.init();
  }
  weatherServices = new WeatherApi(KEY);
  storage = [];

  isAgigngData = (city) => {
    const agingTime = 30 * 60 * 1000;
    const timestampNow = Date.now();
    const storeForecast = this.store.getSavedForecast(city);
    const timeDelta = timestampNow - storeForecast.timestamp;
    if (timeDelta < agingTime) {
      return false;
    }
    return true;
  };

  getdata = async (city) => {
    if (this.store.getSavedForecast(city) && !this.isAgigngData(city)) {
      this.storage = this.store.getSavedForecast(city);
    } else {
      await this.weatherServices
        .getForecast(city)
        .then((data) => {
          this.storage = data;
          this.store.saveForecast(this.storage);
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  };

  renderError = () => {
    this.containerComponents.classList.add("componets__container");
    this.containerComponents.innerHTML = "";
    const pError = this.createElement({
      el: "p",
      class: ["container", "error"],
    });

    pError.innerText = "Service Temporarily Unavailable";
    this.containerComponents.append(pError);
    this.parentContainer.append(this.containerComponents);
  };

  init = async () => {
    this.renderNavigation();
    await this.getdata(DEFAULT_CITY)
      .then(() => {
        this.render();
      })
      .catch(() => {
        this.renderError();
      });
  };

  renderNavigation = () => {
    this.nav = new Navigation(this.parentContainer, this);
    this.nav.render();
  };

  renderComponents = () => {
    this.infoComponents = new Info(this.containerComponents, this.storage);
    this.infoComponents.render();
    this.currentWeather = new CurrentWeather(
      this.containerComponents,
      this.storage
    );
    this.currentWeather.render();
    this.forecastDays = new ForecastDays(
      this.containerComponents,
      this.storage.forecast
    );
    this.forecastDays.render();
    this.forecastHours = new ForecastHours(
      this.containerComponents,
      this.storage
    );
    this.forecastHours.render();
  };

  render = () => {
    this.containerComponents.classList.add("componets__container");
    this.containerComponents.innerHTML = "";
    this.renderComponents();
    this.parentContainer.append(this.containerComponents);
  };
}
