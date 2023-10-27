import Components from "../../Components.js";
import SearchList from "./SearchList/SearchList.js";
export default class SearchInput extends Components {
  constructor(element, app) {
    super(element);
    this.app = app;
    this.weatherApi = app.weatherServices;
  }
  createImgInp() {
    const imgWrap = this.createElement({
      el: "div",
      class: ["icon_placeholder__wrap"],
    });
    const imgInp = this.createElement({
      el: "img",
      atr: [{ src: "./images/search_bar.png" }, { alt: "icon search input" }],
      class: ["icon_placeholder"],
    });
    imgWrap.append(imgInp);
    return imgWrap;
  }

  createInput() {
    return input;
  }

  createSearchInpEl = () => {
    const imgWrap = this.createElement({
      el: "div",
      class: ["icon_placeholder__wrap"],
    });
    const imgInp = this.createElement({
      el: "img",
      atr: [{ src: "./images/search_bar.png" }, { alt: "icon search input" }],
      class: ["icon_placeholder"],
    });
    this.input = this.createElement({
      el: "input",
      atr: [
        { type: "text" },
        { placeholder: "Search for your preffered city..." },
      ],
      class: ["search__inp"],
    });

    this.searchDiv = this.createElement({
      el: "div",
      class: ["search__list-container", "hide"],
    });

    this.input.addEventListener("keyup", this.liveSearchForecast);
    imgWrap.append(imgInp);
    this.containerComponents.append(imgWrap, this.input, this.searchDiv);
  };

  liveSearchForecast = async (e) => {
    if (e.target.value.length >= 3) {
      if (this.setTimeoutId) clearTimeout(this.setTimeoutId);
      this.setTimeoutId = setTimeout(async () => {
        await this.weatherApi
          .searchCity(e.target.value)
          .then((data) => {
            if (data.length) {
              this.renderSearchList(data);
            }
          })
          .catch((e) => {
            this.app.renderError();
          });
      }, 1000);
    } else if (e.target.value.length <= 2 && e.target.value.length > 0) {
      this.searchDiv.innerHTML = "";
      this.searchDiv.classList.add("hide");
    } else if (e.target.value.length === 0) {
      this.searchDiv.innerHTML = "";
      this.searchDiv.classList.add("hide");
      document.body.classList.remove("modal");
      if (this.setTimeoutId) clearTimeout(this.setTimeoutId);
    }

    if (e.key === "Enter") {
      if (this.setTimeoutId) clearTimeout(this.setTimeoutId);
      await this.weatherApi
        .getForecast(e.target.value.trim())
        .then((data) => {
          if (!data.error) {
            e.target.value = "";
            this.searchDiv.innerHTML = "";
            this.searchDiv.classList.add("hide");
            document.body.classList.remove("modal");
            if (this.setTimeoutId) clearTimeout(this.setTimeoutId);
            this.app.storage = data;
            this.app.store.saveForecast(this.app.storage);
            this.app.render();
          } else {
            this.searchDiv.innerHTML = "";
            this.searchDiv.classList.remove("hide");
            document.body.classList.add("modal");
            this.searchDiv.innerText = "City not found";
          }
        })
        .catch((e) => {
          this.app.renderError();
        });
    }
  };

  renderSearchList = (data) => {
    this.searchDiv.innerHTML = "";
    this.searchDiv.classList.remove("hide");
    document.body.classList.add("modal");
    const searchList = new SearchList(
      this.searchDiv,
      this.input,
      data,
      this.app
    );
    searchList.render();
  };

  render = () => {
    this.containerComponents.innerHTML = "";
    this.containerComponents.classList.add("search__bar");
    this.createSearchInpEl();

    if (this.containerComponents.parentNode === null) {
      this.parentContainer.append(this.containerComponents);
    }
  };
}
