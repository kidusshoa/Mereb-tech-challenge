import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import axios from "axios";

const app = new Elysia()
  .use(cors())
  .get("/api/loripsum", async () => {
    const { data } = await axios.get("https://loripsum.net/api/1/short");
    return data;
  })
  .listen(8000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
