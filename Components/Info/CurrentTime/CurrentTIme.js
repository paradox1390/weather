import Components from "../../Components.js";

export default class CurrentTime extends Components {
  constructor(element, { tz_id }) {
    super(element);
    this.timeZone = tz_id;
    this.reRenderComponets = this.render.bind(this);
    setInterval(this.reRenderComponets, 1000);
  }
  containerComponents = this.createElement({
    el: "p",
    class: ["current__time"],
  });
  formatedTime = () => {
    const formatTime = new Intl.DateTimeFormat("en-GB", {
      timeZone: this.timeZone,
      hour: "numeric",
      minute: "numeric",
    });
    const date = new Date();
    return formatTime.format(date);
  };
  render = () => {
    this.containerComponents.innerText = "";
    const time = this.formatedTime();
    this.containerComponents.innerText = time;
    this.parentContainer.append(this.containerComponents);
  };
}
