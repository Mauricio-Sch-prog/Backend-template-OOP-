
import env from "../config/cleanEnv.js";
import { connection } from "../config/sequelize.js";

async function sync () {
  try {
        
    await connection.authenticate();
    console.log("Connected to database");
        
    await connection.sync({ alter: env.alterTablesWhileSync });
    console.log("Models syncronized succesfully");
        
    return;
  } catch (err) {
    console.error(`Failed to connect with database:${err}`);
  }
} 

export default sync;