// Import Sequalize and other libraires
import { Sequelize, Model, DataTypes,  QueryTypes } from 'sequelize';

//imports dontenv module and allows us to access stored environment variables stored in .env file
import 'dotenv/config';

import { Listing } from './ListingModel.js';

// Connect to the database 
const sequelize = new Sequelize(process.env.API_URL);

//Try catch block with await
try {
  // Testing the Connection
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
} 
  
  // Retrieve all listings in the database, and log them to the console.   
  async function retrieveAllListings() {  
    Listing.findAll();
    console.log('Retrieving all listings');
  }
  
  // Find the document that contains data corresponding to Library West, then log it to the console. 
  async function findLibraryWest() {
    //ADD CODE HERE
    const row = await Listing.findOne({ where: { name: 'Library West' } });
    if (row === null) {
      console.log('Not found!');
    } else {
      console.log(row); // display everything??
    }
    console.log('Finding Library West');
  }

  //Find the document with the code 'CABL' and remove this listing.     
  async function removeCable() {
      await Listing.destroy({
      where: {
        code: "CABL"
      },
      });
    console.log('Removing Cable BLDG');
  }

  //Create a listing for the new Data Science and IT (DSIT) Building. Add the code and name to the database.
  async function addDSIT() {
      //ADD CODE HERE
      Listing.create({
      code: "DSIT",
      name: "Data Science and IT Building"
      });
    console.log('Adding the new DSIT BLDG that will be across from Reitz union. Bye Bye CSE, Hub, and French Fries.');
  }

  // Update the address for the Phelps Laboratory
  async function updatePhelpsLab() {
    const row = await Listing.findOne({ where: { name: "Phelps Laboratory" } });
    row.address = "1953 Museum Rd.  Gainesville, FL 32611";
    await row.save();
      console.log('UpdatingPhelpsLab.');
  }

   //Calling all the functions to test them
   async function runFunctionsSequentially() {
    //Wrapped these in an async function - credit Zachary Tyson PM
    await retrieveAllListings();
    await removeCable();
    await addDSIT();
    await updatePhelpsLab();
    await findLibraryWest();
    }
    runFunctionsSequentially().catch((error) => {
        console.error('An error occurred:', error);
    });