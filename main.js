import { polyfillCountryFlagEmojis } from "https://cdn.skypack.dev/country-flag-emoji-polyfill";
import App from "./App.js";
polyfillCountryFlagEmojis();

const appEl = document.querySelector(".app");
const app = new App(appEl);
