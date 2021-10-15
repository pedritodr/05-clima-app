require('dotenv').config();
const { inquirerMenu, pause, loadInput, listPlaces } = require('./helpers/inquirer');
const Searchs = require('./models/searchs');

const main = async() => {
    let opt = '';
    const searchs = new Searchs();
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                const place = await loadInput('Ciudad: ');
                const places = await searchs.searchCity(place);
                const idSelected = await listPlaces(places);
                if (idSelected === 0) continue;
                const placeSelected = await places.find((item) => item.id === idSelected);
                searchs.addHistorial(placeSelected.name);
                const weather = await searchs.seachWaether(placeSelected.lat, placeSelected.lng);
                console.clear();
                console.log('\n Infomación de la ciudad\n'.green);
                console.log('Ciudad: ' + placeSelected.name.green);
                console.log('Lat: ' + placeSelected.lat);
                console.log('Lng: ' + placeSelected.lng);
                console.log('Como está el clima: ' + weather.desc.green);
                console.log('Temperatura: ' + weather.temp);
                console.log('Máxima: ' + weather.max);
                console.log('Mínima: ' + weather.min);
                break;
            case 2:
                searchs.historialCapitalizado();
                break;
        }
        console.log('\n');
        await pause();
    } while (opt !== 0);


}

main();