"use strict";
console.log("Running webapp...");

let express = require('express'),
    app = new express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    Query = require('./src/models/queryModel'),
    routes = require('./src/routes/routes'),
    port = process.env.PORT || 8080,
    mongoUri = "mongodb+srv://immo-xplorer-user:1WERe9xr0q9CfcL9@cluster0-aru9i.azure.mongodb.net/immo-xplorer?retryWrites=true";

mongoose.Promise = global.Promise;
mongoose.connect(mongoUri, {useNewUrlParser: true});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('./app'));

routes(app);

// app.post('/api/ads', (req,res)=>{
//     let adsController = require('./controllers/adController');
//     let priceRange = req.body.priceRange;
//     adsController.getAds(priceRange).subscribe(result => {
//         res.status(200).json(result);
//     });
// })
app.listen(port, ()=>{
	//console.log(`Running webhook listener...`);
	console.log(`App listening on port ${port}`);
});
