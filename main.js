"use strict";
console.log("Running webapp...");

let express = require('express');
let bodyParser = require('body-parser');
var cors = require('cors');

let app = new express();
let port = process.env.PORT || 4243;
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('./app'));

app.get('/api/ads',(req,res)=>{
    let adsController = require('./controllers/adsController');
    adsController.getAds().subscribe(result => {
        res.status(200).json(result);
    });
})
app.listen(port,()=>{
	//console.log(`Running webhook listener...`);
	console.log(`App listening on port ${port}`);
}) ;
