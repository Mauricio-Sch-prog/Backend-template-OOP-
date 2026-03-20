import "dotenv/config";
import { cleanEnv, bool, str, num, port } from "envalid";

const env = cleanEnv(process.env, {
  PORT: port({ default: 3004 }),
  HOST: str("http://localhost:"),

  ONLINE: bool({ default: true }),
  IS_ADMIN: bool({ default: true }),
  alterTablesWhileSync: bool({ default: true }),

  MYSQL_HOSTBANCO: str({ default: "localhost" }),
  MYSQL_USERBANCO: str({ default: "root" }),
  MYSQL_SBANCO: str({ default: "senai" }),
  MYSQL_BANCO: str(),
  MYSQL_PORTBANCO: num({ default: 3306 }),

});

export default env;