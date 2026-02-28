import { createApp } from "./src/server/request_handler.js";
import { DatabaseSync } from "node:sqlite";
import * as storageFns from "./src/db/db.js";

const main = () => {
  const storage = new DatabaseSync("./storage/app.db");
  storageFns.init(storage);
  const app = createApp({ storage, storageFns });
  Deno.serve({
    port: 8000,
    onListen: (p) => console.log(`Listening from : ${p.port}`),
  }, app.fetch);
};

main();
