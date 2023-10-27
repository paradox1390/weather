import Components from "../../../Components.js";
import SearchListItem from "./SearchListItem/SearchListItem.js";
export default class SearchList extends Components {
  constructor(element, input, data, app) {
    super(element);
    this.app = app;
    this.data = data;
    this.input = input;
  }
  containerComponents = this.createElement({
    el: "ul",
    class: ["search__list"],
  });
  reRenderApp = () => {
    this.parentContainer.classList.add("hide");
    this.parentContainer.innerHTML = ``;
    document.body.classList.remove("modal");
    this.input.value = "";
    this.app.render();
  };
  createSearchListEl = () => {
    this.data.forEach((city) => {
      const searchListItem = new SearchListItem(
        this.containerComponents,
        city,
        this.reRenderApp,
        this.app
      );
      searchListItem.render();
    });
  };
  render = () => {
    this.createSearchListEl();
    this.parentContainer.append(this.containerComponents);
  };
}
