import { LightningElement, track } from 'lwc';
import getWeather from '@salesforce/apex/WeatherServiceController.getWeather';

export default class WeatherWidget extends LightningElement {
    @track cityName = '';
    @track weatherData;
    @track error;

    handleCityChange(event) {
        this.cityName = event.target.value;
    }

    fetchWeather() {
        getWeather({ cityName: this.cityName })
            .then(result => {
                console.log('Raw API Response:', result);
                let data;
                try {
                    data = JSON.parse(result);
                } catch (e) {
                    this.error = 'Invalid JSON response from API';
                    this.weatherData = undefined;
                    return;
                }

                if (data && data.main && data.weather) {
                    this.weatherData = data;
                    this.error = undefined;
                } else if (data.error) {
                    this.weatherData = undefined;
                    this.error = data.error;
                } else {
                    this.weatherData = undefined;
                    this.error = 'Unexpected API response structure';
                }
            })
            .catch(error => {
                console.error('Apex call error:', error);
                this.error = error.body ? error.body.message : error.message;
                this.weatherData = undefined;
            });
    }
}
