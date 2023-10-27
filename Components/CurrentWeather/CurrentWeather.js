import Components from "../Components.js";
import CurrentTemp from "./CurrentTemp/CurrentTemp.js";
import CurrentCloudiness from "./CurrentCloudiness/CurrentCloudiness.js";
import CurrentHumidity from "./CurrentHumidity/CurrentHumidity.js";
import CurrentWind from "./CurrentWind/СurrentWind.js";
import CurrentPressure from "./CurrentPressure/CurrentPressure.js";
import CurrentUV from "./CurrentUV/CurrentUV.js";

export default class CurrentWeather extends Components {
  constructor(element, storage) {
    super(element);
    this.storage = storage;

    // this.render;
  }

  renderComponents = () => {
    this.currentTemp = new CurrentTemp(this.containerComponents, this.storage);
    this.currentTemp.render();
    this.currentCloudiness = new CurrentCloudiness(
      this.containerComponents,
      this.storage
    );
    this.currentCloudiness.render();

    const paramsDiv = this.createElement({
      el: "div",
      class: ["params__container"],
    });
    this.currentHumidity = new CurrentHumidity(paramsDiv, this.storage.current);
    this.currentHumidity.render();
    this.currentWind = new CurrentWind(paramsDiv, this.storage.current);
    this.currentWind.render();
    this.currentPressure = new CurrentPressure(paramsDiv, this.storage.current);
    this.currentPressure.render();
    this.currentUV = new CurrentUV(paramsDiv, this.storage.current);
    this.currentUV.render();
    this.containerComponents.append(paramsDiv);
  };

  render = () => {
    this.renderComponents();
    this.containerComponents.classList.add("current__weather-container");
    this.containerComponents.classList.add("container");
    this.parentContainer.append(this.containerComponents);
  };
}
