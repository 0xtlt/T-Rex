import { Application, send } from "./deps.ts";
import { isInstalled, readConfig } from "./src/core.ts";
import { InstallRoute } from "./src/routes/routes.ts";

const Server = new Application();

Server.use(async (context, next) => {
  const PATHS = context.request.url.pathname.split("/");
  if (
    !PATHS[1] || (PATHS[1] !== "_" && PATHS[1] !== "__") ||
    PATHS.slice(2).length !== 1
  ) {
    await next();
    return;
  }

  try {
    await send(context, PATHS.slice(2)[0], {
      root: PATHS[1] === "__"
        ? `${Deno.cwd()}/themes/${(await readConfig()).theme}/public/`
        : `${Deno.cwd()}/public/`,
    });
  } catch (e) {
    await next();
  }
});

Server.use(InstallRoute.routes());

Server.use(async function (ctx, next) {
  if (await isInstalled()) {
    return await next();
  }

  return ctx.response.redirect("/install");
});

console.log("Server Ready");

await Server.listen({
  port: 8080,
});
