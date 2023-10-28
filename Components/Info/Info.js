import Components from "../Components.js";
import CityName from "./CityName/CityName.js";
import CurrentTime from "./CurrentTime/CurrentTIme.js";
import CurrentDate from "./CurrentDate/CurrentDate.js";

export default class Info extends Components {
  constructor(element, { location }) {
    super(element);
    this.location = location;
    this.cityName = new CityName(this.containerComponents, this.location);
    this.currentTime = new CurrentTime(this.containerComponents, this.location);
    this.currentDate = new CurrentDate(this.containerComponents, this.location);
  }
  containerComponents = this.createElement({
    el: "section",
    class: ["info__container", "container"],
  });
  render = () => {
    this.cityName.render();
    this.currentTime.render();
    this.currentDate.render();
    this.parentContainer.append(this.containerComponents);
  };
}
