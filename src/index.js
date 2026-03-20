import env from "./config/cleanEnv.js";
import sync from "./database/sync.js";
import app from "./app.js";


app.listen(env.PORT, async () => {
  await sync();
  console.log(`Servidor Rodando em  ${env.HOST}${env.PORT}`);
});