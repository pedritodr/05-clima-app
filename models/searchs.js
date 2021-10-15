const fs = require('fs');
const axios = require('axios');

class Searchs {

    constructor() {
        this.historial = [];
        this.path = './db/data.json';
        this.loadDB();
    }
    get paramsMapBox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }
    get paramsWeather() {
        return {
            'appid': process.env.OPENWEATER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }
    async searchCity(place = '') {

        try {
            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapBox
            });

            const resp = await intance.get();
            return resp.data.features.map(place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
            }));
        } catch (error) {
            return [];
        }
    }

    async seachWaether(lat, lon) {
        try {

            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsWeather, lat, lon }
            })

            const resp = await instance.get();
            const { weather, main } = resp.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }

        } catch (error) {
            console.log(error);
        }
    }

    addHistorial(place = '') {
        if (this.historial.includes(place.toLocaleLowerCase())) {
            return;
        }
        this.historial = this.historial.splice(0, 5);
        this.historial.unshift(place.toLocaleLowerCase());
        this.saveDB();
    }

    saveDB() {
        const payload = {
            historial: this.historial
        };
        fs.writeFileSync(this.path, JSON.stringify(payload));
    }

    loadDB() {
        if (fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path, { encoding: 'utf-8' });
            if (data) {
                const info = JSON.parse(data);
                this.historial = info.historial;
            }
        }
    }

    historialCapitalizado() {
        return this.historial.map((place, i) => {
            let palabras = place.split(' ')
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));
            palabras.join(' ');
            const indice = `${i+1}.`.green;
            console.log(`${indice} ${palabras}`);
        });
    }

}
module.exports = Searchs;