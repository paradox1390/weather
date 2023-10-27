import Components from "../../Components.js";
export default class ForecastDay extends Components {
  constructor(element, { day, date }) {
    super(element);
    this.day = day;
    this.date = date;
  }
  containerComponents = this.createElement({ el: "fragment" });
  formatedUrlImg = () => {
    const url = `./images/weather/forecast/day/${this.day.condition.code}.svg`;
    return url;
  };
  formatedDate = () => {
    const formatWeek = new Intl.DateTimeFormat("en-GB", {
      timeZone: this.timeZone,
      weekday: "long",
    });
    const formatDate = new Intl.DateTimeFormat("en-GB", {
      timeZone: this.timeZone,
      day: "numeric",
      month: "long",
    });
    const dateForecast = new Date(this.date);
    const weekDay = formatWeek.format(dateForecast);
    const dayMonth = formatDate.format(dateForecast);
    return `${weekDay}, ${dayMonth}`;
  };
  createForecastDayEl = () => {
    const img = this.createElement({
      el: "img",
      atr: [{ src: `${this.formatedUrlImg()}` }],
      class: ["forecast__day-img"],
    });
    const spanTemp = this.createElement({
      el: "span",
      class: ["forecast__day-temp"],
    });
    const spanDate = this.createElement({
      el: "span",
      class: ["forecast__day-date"],
    });
    spanTemp.innerText = `${this.day.avgtemp_c}°C`;
    spanDate.innerText = `${this.formatedDate()}`;
    this.containerComponents.append(img, spanTemp, spanDate);
  };
  render = () => {
    this.createForecastDayEl();
    this.parentContainer.append(this.containerComponents);
  };
}
