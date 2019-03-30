const leboncoin = require('leboncoin-api');
const _ = require('lodash');
// import { from } from 'rxjs';
let from = require('rxjs').from;
let tap = require('rxjs/operators').tap;
let map = require('rxjs/operators').map;

const priceData = {
    "93200": { min: 2209, avg: 3830, max: 5504 },
    "93400": { min: 3166, avg: 5083, max: 6592 },
    "93300": { min: 2004, avg: 3456, max: 4896 },
    "93310": { min: 3348, avg: 5327, max: 7443 },
    "93500": { min: 2862, avg: 5367, max: 7423 },
    "93260": { min: 4230, avg: 6005, max: 7915 },
    "93170": { min: 2719, avg: 4983, max: 7682 },
    "93100": { min: 3195, avg: 5889, max: 8505 },
    "94300": { min: 6227, avg: 8790, max: 11889 },
    "94160": { min: 6667, avg: 9187, max: 12598 },
    "94200": { min: 3427, avg: 4916, max: 6873 },
    "94270": { min: 4046, avg: 5651, max: 7613 },
    "94250": { min: 4045, avg: 5760, max: 7898 },
    "92120": { min: 4981, avg: 7087, max: 9291 },
    "92240": { min: 4333, avg: 6229, max: 8111 },
    "92170": { min: 4789, avg: 6455, max: 8508 },
    "92130": { min: 5487, avg: 7881, max: 10520 },
    "92100": { min: 6026, avg: 8398, max: 11780 },
    "92210": { min: 4891, avg: 6599, max: 9031 },
    "92150": { min: 3931, avg: 6802, max: 9120 },
    "92800": { min: 5029, avg: 7280, max: 9648 },
    "92200": { min: 7420, avg: 10194, max: 14535 },
    "92400": { min: 4711, avg: 6723, max: 8851 },
    "92600": { min: 3719, avg: 6581, max: 8925 },
    "92000": { min: 3509, avg: 5014, max: 6737 },
    "92700": { min: 2936, avg: 4893, max: 6760 },
    "92250": { min: 4550, avg: 6363, max: 8508 },
    "92270": { min: 4174, avg: 6001, max: 7928 },
    "92300": { min: 6467, avg: 8963, max: 11847 },
    "92110": { min: 4030, avg: 6201, max: 8061 },
    "75000": { min: 6195, avg: 9536, max: 15267 }
};

const locations = Object.keys(priceData).map(x => { return { zipcode: x }; });
const defaultPriceRange = { min: 0, max: 110000 };

function calculateAvgSquarePrices(ads) {
    ads.forEach(ad => {
        ad.squarePrice = Math.round(ad.price / parseInt(ad.attributes.square, 10));
        ad.squarePriceData = priceData[ad.location.zipcode];
        ad.avgSquarePriceDelta =  ad.squarePriceData ? Math.round((ad.squarePrice - ad.squarePriceData.avg) / ad.squarePriceData.avg * 100) : 0;
    });
} 

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
        .addSearchExtra("square", { min: 20 }) // will add a range of price
        .addSearchExtra('real_estate_type', { value: 2 })
        //.addSearchExtra('furnished', ["1", "Non meublé"]); // will add enums for Meublé and Non meublé

        // Please check into categories & sub categories constants to know which are the sub categories to add into "addSearchExtra

    return from(search.run()).pipe(
        map(data => {
            calculateAvgSquarePrices(data.results);
            data.results = _.sortBy(data.results, r => r.avgSquarePriceDelta);
            return data;
        }));
    }

module.exports = { getAds };