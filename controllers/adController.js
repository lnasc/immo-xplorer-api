const leboncoin = require('leboncoin-api'),
    _ = require('lodash'),
    from = require('rxjs').from,
    map = require('rxjs/operators').map,
    first = require('rxjs/operators').first;

const priceData = require('../assets/price-data');

const locations = Object.keys(priceData).map(x => { return { zipcode: x }; });
const defaultPriceRange = { min: 0, max: 110000 };

function calculateAvgSquarePrices(ads) {
    ads.forEach(ad => {
        ad.squarePrice = Math.round(ad.price / parseInt(ad.attributes.square, 10));
        ad.squarePriceData = priceData[ad.location.zipcode];
        ad.avgSquarePriceDelta =  ad.squarePriceData ? Math.round((ad.squarePrice - ad.squarePriceData.avg) / ad.squarePriceData.avg * 100) : 0;
    });
} 

function searchAds(req, res) {
    let priceRange = req.body.priceRange;
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
            priceRange 
            ? Object.assign(defaultPriceRange, priceRange) 
            : defaultPriceRange) // will add a range of price
        .addSearchExtra("square", { min: 20 }) // will add a range of price
        .addSearchExtra('real_estate_type', { value: 2 })
        //.addSearchExtra('furnished', ["1", "Non meublé"]); // will add enums for Meublé and Non meublé
        // Please check into categories & sub categories constants to know which are the sub categories to add into "addSearchExtra

    return from(search.run()).pipe(
        map(data => {
            calculateAvgSquarePrices(data.results);
            data.results = _.sortBy(data.results, r => r.avgSquarePriceDelta);
            return data;
        }),
        first()
        ).subscribe(
            result => res.status(200).json(result),
            error => res.send(error)
        );
    }

module.exports = { searchAds };