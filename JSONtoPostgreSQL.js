  //Import modules/files you may need to correctly run the script. 
  import { Sequelize, Model, DataTypes,  QueryTypes } from 'sequelize';
  
  //Imports dontenv module and allows us to access stored environment variables stored in .env file - See https://www.npmjs.com/package/dotenv
  import 'dotenv/config';

  //Import file system - Examples of how to use the file system module - fs - https://www.scaler.com/topics/nodejs/fs-module-in-node-js/
  import * as fs from 'fs';

  //imports the Listing Model we created in ListingModels.js
  import { Listing } from './ListingModel.js';

  // Global Variables
  var listingData;

//Connect to your database 
const sequelize = new Sequelize(process.env.API_URL);

//Testing that the .env file is working
console.log(process.env.PORT); //Should print out 8080 
console.log(process.env.API_Key); //Should print out API Key

 try {
  //Setup table in the DB
  await Listing.sync({ force: true });
  console.log("The table for the Listing model was just (re)created!");
  
  // This callback function read the listings.json file into memory (data) and stores errors in (err).
      fs.readFile('listings.json', 'utf8', function(err, data) {
        if (err) throw err;
    
    //Save and parse the data from the listings.json file into a variable, so that we can iterate through each instance
    listingData = JSON.parse(data);

    //Use Sequelize create a new row in our database for each entry in our listings.json file using the Listing model we created in ListingModel.js   
     for (let i = 0 ; i < listingData.entries.length; i++) {
      Listing.create({
        code: listingData.entries[i].code,
        name: listingData.entries[i].name,
        coordinates: JSON.stringify(listingData.entries[i].coordinates),
        address: listingData.entries[i].address
      });
    };
  });

} catch (error) {
  console.error('Unable to connect to the database:', error);
}

 