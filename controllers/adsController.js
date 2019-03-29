const leboncoin = require('leboncoin-api');
const _ = require('lodash');
// import { from } from 'rxjs';
let from = require('rxjs').from;
let tap = require('rxjs/operators').tap;
let map = require('rxjs/operators').map;

const locations = [
    {"zipcode": "93200"}, // Saint-Denis
    {"zipcode": "93400"}, // Saint-Ouen
    {"zipcode": "93300"}, // Aubervilliers
    {"zipcode": "93310"}, // Le Pré-Saint-Gervais
    {"zipcode": "93500"}, // Pantin
    {"zipcode": "93260"}, // Les Lilas
    {"zipcode": "93170"}, // Bagnolet
    {"zipcode": "93100"}, // Montreuil
    {"zipcode": "94300"}, // Vincennes
    {"zipcode": "94160"}, // Saint-Mandé
    {"zipcode": "94200"}, // Ivry-sur-Seine
    {"zipcode": "94270"}, // Le Kremlin-Bicêtre
    {"zipcode": "94250"}, // Gentilly
    {"zipcode": "92120"}, // Montrouge
    {"zipcode": "92240"}, // Malakoff
    {"zipcode": "92170"}, // Vanves
    {"zipcode": "92130"}, // Issy-les-Moulineaux
    {"zipcode": "921OO"}, // Boulogne
    {"zipcode": "92210"}, // Saint-Cloud
    {"zipcode": "92150"}, // Suresnes
    {"zipcode": "92800"}, // Puteaux
    {"zipcode": "92200"}, // Neuilly
    {"zipcode": "92400"}, // Courbevoie
    {"zipcode": "92600"}, // Asnières
    {"zipcode": "92000"}, // Nanterre
    {"zipcode": "92700"}, // Colombes
    {"zipcode": "92250"}, // La Garenne-Colombes
    {"zipcode": "92270"}, // Bois-Colombes
    {"zipcode": "92300"}, // Levallois-Perret
    {"zipcode": "92110"}  // Clichy
   ];

   const defaultPriceRange = { min: 110000 };

function getAds(priceRange) {
    let search = new leboncoin.Search()
        .setPage(1)
        .setLimit(1000)
    // .setQuery("a renover")
    //  .setFilter(leboncoin.FILTERS.PARTICULIER)
        .setCategory("ventes_immobilieres")
        .setRegion("ile_de_france")
    //  .setDepartment("yvelines")
        .setLocation(locations)
        .addSearchExtra("price", 
            priceRange ? Object.assign(defaultPriceRange, priceRange) : defaultPriceRange) // will add a range of price
        .addSearchExtra("square", { min: 15 }) // will add a range of price
        .addSearchExtra('real_estate_type', { value: 2 })
        .addSearchExtra('immo_sell_type', ["old"])
        //.addSearchExtra('furnished', ["1", "Non meublé"]); // will add enums for Meublé and Non meublé

        // Please check into categories & sub categories constants to know which are the sub categories to add into "addSearchExtra

    return from(search.run()).pipe(
        map(data => {
            data.results = _.sortBy(data.results, r => r.price);
            return data;
        }));
    }

module.exports = { getAds };