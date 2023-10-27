export default class WeatherApi {
  constructor(key) {
    this.key = key;
  }
  baseUrl = new URL("https://api.weatherapi.com/v1/");
  getForecast = async (city, days = 3) => {
    const url = new URL("forecast.json", this.baseUrl);
    url.searchParams.set("days", days);
    url.searchParams.set("q", city);
    url.searchParams.set("key", this.key);
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.error && data.error.code !== 1006) {
        console.log(
          "call func logger error in this place =>",
          data.error.message
        );
        throw Error("Service Temporarily Unavailable");
      }
      return data;
    } catch (e) {
      throw Error(`${e.message}`);
    }
  };

  searchCity = async (city) => {
    const url = new URL("search.json", this.baseUrl);
    url.searchParams.set("q", city);
    url.searchParams.set("key", this.key);

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.error) {
        console.log(
          "call func logger error in this place =>",
          data.error.message
        );
        throw Error("Service Temporarily Unavailable");
      }
      return data;
    } catch (e) {
      throw Error(`${e.message}`);
    }
  };
}
