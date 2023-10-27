import Components from "../../Components.js";
export default class SwitherSchema extends Components {
  constructor(element) {
    super(element);
    this.lightStyles = document.querySelectorAll(
      "link[rel=stylesheet][media*=prefers-color-scheme][media*=light]"
    );
    this.darkStyles = document.querySelectorAll(
      "link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]"
    );
    this.darkSchemeMedia = matchMedia("(prefers-color-scheme: dark)");
    this.swStatusLabel = this.createElement({
      el: "div",
      class: ["switcher__status-label"],
    });
    this.swStatusLabel.innerText = "auto mode";
    this.render();
    this.setupSwitcher();
    this.setupScheme();
  }

  setupSwitcher = () => {
    const savedScheme = this.getSavedScheme();
    if (savedScheme !== null) {
      switch (savedScheme) {
        case "auto":
          this.inputAuto.style.checked = true;
          break;
        case "light":
          this.inputLight.style.checked = true;
          break;
        case "dark":
          this.inputDark.style.checked = true;
      }
      //   const currentRadio = document.querySelector(
      //     `.switcher-radio[value=${savedScheme}]`
      //   );
      //   currentRadio.checked = true;
    }
  };

  setupScheme = () => {
    const savedScheme = this.getSavedScheme();
    const systemScheme = this.getSystemScheme();

    if (savedScheme === null) return;

    if (savedScheme !== systemScheme) {
      this.setScheme(savedScheme);
    }
  };

  setScheme = (scheme) => {
    this.switchMedia(scheme);

    if (scheme === "auto") {
      this.clearScheme();
    } else {
      this.saveScheme(scheme);
    }
  };

  switchMedia = (scheme) => {
    let lightMedia;
    let darkMedia;

    if (scheme === "auto") {
      lightMedia = "(prefers-color-scheme: light)";
      darkMedia = "(prefers-color-scheme: dark)";
      this.swStatusLabel.innerText = `auto mode`;
    } else {
      lightMedia = scheme === "light" ? "all" : "not all";
      darkMedia = scheme === "dark" ? "all" : "not all";
      scheme === "light"
        ? (this.swStatusLabel.innerText = `light mode`)
        : (this.swStatusLabel.innerText = `dark mode`);
    }

    [...this.lightStyles].forEach((link) => {
      link.media = lightMedia;
    });

    [...this.darkStyles].forEach((link) => {
      link.media = darkMedia;
    });
  };

  getSystemScheme = () => {
    const darkScheme = this.darkSchemeMedia.matches;

    return darkScheme ? "dark" : "light";
  };

  getSavedScheme = () => {
    return localStorage.getItem("color-scheme");
  };

  saveScheme = (scheme) => {
    localStorage.setItem("color-scheme", scheme);
  };

  clearScheme = () => {
    localStorage.removeItem("color-scheme");
  };

  createSwitcherEl = () => {
    this.inputLight = this.createElement({
      el: "input",
      atr: [{ type: "radio" }, { name: "color-sheme" }, { value: "light" }],
      class: ["switcher-radio", "switcher-radio-light"],
    });
    this.inputAuto = this.createElement({
      el: "input",
      atr: [
        { type: "radio" },
        { name: "color-sheme" },
        { value: "auto" },
        { checked: true },
      ],
      class: ["switcher-radio", "switcher-radio-auto"],
    });
    this.inputDark = this.createElement({
      el: "input",
      atr: [{ type: "radio" }, { name: "color-sheme" }, { value: "dark" }],
      class: ["switcher-radio", "switcher-radio-dark"],
    });
    const divStatus = this.createElement({
      el: "div",
      class: ["switcher__status"],
    });

    this.inputLight.addEventListener("change", (event) => {
      this.setScheme(event.target.value);
    });
    this.inputAuto.addEventListener("change", (event) => {
      this.setScheme(event.target.value);
    });
    this.inputDark.addEventListener("change", (event) => {
      this.setScheme(event.target.value);
    });

    this.containerComponents.append(
      this.inputLight,
      this.inputAuto,
      this.inputDark,
      divStatus
    );
  };

  render = () => {
    const legend = this.createElement({
      el: "legend",
      class: ["switcher__legend"],
    });

    legend.innerText = "Choose color scheme";
    this.containerComponents.classList.add("switcher-radio__wrap");
    this.parentContainer.append(legend);
    this.createSwitcherEl();
    this.parentContainer.append(this.containerComponents);
    this.parentContainer.append(this.swStatusLabel);
  };
}
