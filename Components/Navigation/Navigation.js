import Components from "../Components.js";
import SwitherSchema from "./SwitcherSchema/SwitherSchema.js";
import SearchInput from "./SearchInput/SearchInput.js";
export default class Navigation extends Components {
  constructor(element, app) {
    super(element);
    this.app = app;
  }

  renderComponents = () => {
    const fieldSet = this.createElement({
      el: "fieldset",
      class: ["switcher"],
    });
    new SwitherSchema(fieldSet);
    this.containerComponents.append(fieldSet);
    const search = new SearchInput(this.containerComponents, this.app);
    search.render();
  };

  render = () => {
    this.containerComponents.classList.add("control__container");
    this.renderComponents();
    this.parentContainer.append(this.containerComponents);
  };
}
