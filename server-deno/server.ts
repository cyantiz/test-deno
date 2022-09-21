import { Application, Router} from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import albums from "./albums.ts";

const router = new Router();
router
    .get("/", (context) => {
        context.response.body = "Hello world!";
    })
    .get("/albums", (context) => {
        context.response.headers.set("Content-Type", "application/json");
        context.response.body = JSON.stringify(albums);
    })
    .get("/albums/:id", (context) => {
        const id = context.params.id;
        if (id) {
            const album = albums.find((album) => album.id == Number(id));
            if (album) {
                context.response.headers.set("Content-Type", "application/json");
                context.response.body = JSON.stringify(album);
            }
        }
    });

const app = new Application();
app.use(oakCors({
    origin: '*',
    optionsSuccessStatus: 200,
}));
app.use(router.routes());
app.use(router.allowedMethods());
console.log("Server running on port 3333");
await app.listen({ port: 3333 });
