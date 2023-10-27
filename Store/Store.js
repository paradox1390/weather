export default class Store {
  saveForecast = (forecast) => {
    forecast.timestamp = Date.now();
    localStorage.setItem(forecast.location.name, JSON.stringify(forecast));
  };
  getSavedForecast = (cityName) => {
    return JSON.parse(localStorage.getItem(cityName));
  };
}
