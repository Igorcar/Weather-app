class Forecast {
    constructor() {
        this.key = 'nTDNPpck9hxZ3Yv7NQPGdWqMmaDVF3ik'
        this.cityBase = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        this.weatherBase = 'http://dataservice.accuweather.com/currentconditions/v1/'
    }

    async cityUpdate(city) {

        const cityDets = await this.getCity(city);
        const weather = await this.getWeather(cityDets.Key);

        return {
            cityDets: cityDets,
            weather: weather
        }

    }

    async getCity(city) {
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityBase + query);
        const data = await response.json();
        return data[0];

    }
    async getWeather(cityKey) {
        const query = `${cityKey}?apikey=${this.key}`
        const response = await fetch(this.weatherBase + query)
        const data = await response.json()
        return data[0];
    }

}