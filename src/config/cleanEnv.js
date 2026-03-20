import "dotenv/config";
import { cleanEnv, bool, str, num, port } from "envalid";

const env = cleanEnv(process.env, {
  PORT: port({ default: 3004 }),
  HOST: str("http://localhost:"),

  ONLINE: bool({ default: true }),
  IS_ADMIN: bool({ default: true }),
  alterTablesWhileSync: bool({ default: true }),

  MYSQL_HOST: str({ default: "localhost" }),
  MYSQL_USER: str({ default: "root" }),
  MYSQL_PASSWORD: str(),
  MYSQL_BANK: str(),
  MYSQL_PORT: num({ default: 3306 }),

});

export default env;