import Components from "../../Components.js";

export default class CurrentDate extends Components {
  constructor(element, { tz_id }) {
    super(element);
    this.timeZone = tz_id;
  }
  containerComponents = this.createElement({
    el: "p",
    class: ["current__date-container"],
  });

  formatedTime = () => {
    const formatWeek = new Intl.DateTimeFormat("en-GB", {
      timeZone: this.timeZone,
      weekday: "long",
    });
    const formatDate = new Intl.DateTimeFormat("en-GB", {
      timeZone: this.timeZone,
      day: "numeric",
      month: "long",
    });
    const date = new Date();
    const weekDay = formatWeek.format(date);
    const day = formatDate.format(date);
    return [weekDay, day];
  };

  render = () => {
    this.containerComponents.innerHTML = "";
    const date = this.formatedTime();
    const weekElement = this.createElement({
      el: "span",
      class: ["week__day"],
    });
    const dayElement = this.createElement({
      el: "span",
      class: ["month__day"],
    });
    weekElement.innerText = date[0];
    dayElement.innerText = date[1];
    this.containerComponents.append(weekElement, dayElement);
    this.parentContainer.append(this.containerComponents);
  };
}
