// Import Sequalize and other libraires
import { Sequelize, Model, DataTypes } from 'sequelize';

  //imports dontenv module and allows us to access stored environment variables stored in .env file
  import 'dotenv/config';

//Connect to the database
const sequelize = new Sequelize(process.env.API_URL);

//Create Sequalize Model
const Listing = sequelize.define('Listing', {
  // Model attributes are defined here
  code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
 coordinates: {
    type: DataTypes.JSONB,
 }, 
  address: {
    type: DataTypes.STRING
  }

}, {
  // Other model options go here
  tableName: 'Listings'
});

// `sequelize.define` also returns the model
console.log(Listing === sequelize.models.Listing); // true
console.log(Listing);

// Export the model to make it avaiable to other parts of your Node application 
export { Listing };