const leboncoin = require('leboncoin-api');
const _ = require('lodash');
// import { from } from 'rxjs';
let from = require('rxjs').from;
let tap = require('rxjs/operators').tap;
let map = require('rxjs/operators').map;

var search = new leboncoin.Search()
    .setPage(1)
    .setLimit(1000)
   // .setQuery("a renover")
  //  .setFilter(leboncoin.FILTERS.PARTICULIER)
    .setCategory("ventes_immobilieres")
    .setRegion("ile_de_france")
  //  .setDepartment("yvelines")
    .setLocation([
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
                ])
    .addSearchExtra("price", { max: 110000 }) // will add a range of price
    .addSearchExtra("square", { min: 25 }) // will add a range of price
    .addSearchExtra('real_estate_type', { value: 2 })
    //.addSearchExtra('furnished', ["1", "Non meublé"]); // will add enums for Meublé and Non meublé

// Please check into categories & sub categories constants to know which are the sub categories to add into "addSearchExtra"

function getAds() {
    return from(search.run()).pipe(
        map(data => {
            console.log(data.results[0])
            console.log(data.page); // the current page
            console.log(data.pages); // the number of pages
            console.log(data.nbResult); // the number of results for this search
            console.log(data.results); // the array of results
        
            data.results = _.sortBy(data.results, r => r.price);
            
        
            data.results[0].getDetails().then(function (details) {
                console.log(details); // the item 0 with more data such as description, all images, author, ...
            }, function (err) {
                console.error(err);
            });
            data.results[0].getPhoneNumber().then(function (phoneNumer) {
                console.log(phoneNumer); // the phone number of the author if available
            }, function (err) {
                console.error(err); // if the phone number is not available or not parsable (image -> string) 
            });
            
            return data;
        }));
    }

module.exports = { getAds };