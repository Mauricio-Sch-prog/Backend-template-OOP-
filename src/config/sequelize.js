import Sequelize from "sequelize";
import env from "./cleanEnv.js";

const host = env.MYSQL_HOSTBANCO;
const user = env.MYSQL_USERBANCO;
const password = env.MYSQL_SBANCO;
const database = env.MYSQL_BANCO;
const port = env.MYSQL_PORTBANCO;

export const connection = new Sequelize(database, user, password, {
  host,
  dialect: "mysql",
  logging: false,
  port
});

