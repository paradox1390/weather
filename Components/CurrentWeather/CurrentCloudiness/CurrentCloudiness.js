import Components from "../../Components.js";

export default class CurrentCloudiness extends Components {
  constructor(element, storage) {
    super(element);
    this.timeZone = storage.location.tz_id;
    this.condition = storage.current.condition;
  }
  getDayNight = () => {
    const formatTime = new Intl.DateTimeFormat("en-GB", {
      timeZone: this.timeZone,
      hour: "numeric",
    });
    const date = new Date();
    const hour = formatTime.format(date);
    return hour > 6 && hour < 20 ? "day" : "night";
  };
  formatUrlImg = () => {
    const dayNight = this.getDayNight();
    const code = this.condition.code;
    const url = `./images/weather/forecast/${dayNight}/${code}.svg`;
    return url;
  };
  createCloudinessEl = () => {
    const imgWrap = this.createElement({
      el: "div",
      class: ["cloudiness__img-wrap"],
    });
    const img = this.createElement({
      el: "img",
      atr: [
        { src: `${this.formatUrlImg()}` },
        { alt: `${this.condition.text}` },
      ],
    });
    const spanDesc = this.createElement({
      el: "span",
      class: ["cloudiness_desc"],
    });
    spanDesc.innerText = `${this.condition.text}`;
    imgWrap.append(img);
    this.containerComponents.append(imgWrap, spanDesc);
  };

  render = () => {
    this.containerComponents.classList.add("cloudiness__container");
    this.createCloudinessEl();
    this.parentContainer.append(this.containerComponents);
  };
}
