import Sequelize from "sequelize";
import env from "./cleanEnv.js";

const host = env.MYSQL_HOST;
const user = env.MYSQL_USER;
const password = env.MYSQL_PASSWORD;
const database = env.MYSQL_BANK;
const port = env.MYSQL_PORT;

export const connection = new Sequelize(database, user, password, {
  host,
  dialect: "mysql",
  logging: false,
  port
});

