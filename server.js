const path = require("path");
const fs = require("fs");

const Koa = require("koa");
const ServerRenderer = require("vue-server-renderer");
const Router = require("koa-router");
const static = require("koa-static");
const router = new Router();
const app = new Koa();

const template = fs.readFileSync(
  path.resolve(__dirname, "dist/server.html"),
  "utf8"
);
// const ServerBundle = fs.readFileSync(
//   path.resolve(__dirname, "dist/server.bundle.js"),
//   "utf8"
// );
// webpack使用了vue-server-renderer后，使用如下
const ServerBundle = require("./dist/vue-ssr-server-bundle.json");
const clientManifest = require("./dist/vue-ssr-client-manifest.json");

const render = ServerRenderer.createBundleRenderer(ServerBundle, {
  template,
  clientManifest,
  /* 当webpack的entry的键不使用client时，需要手动修改代码
     在webpack中使用vue-server-renderer插件，
     就会生成manifest文件，自动引入打包后的文件
     这样就不用把打包后的client.bundle.js文件写死，而是从manifest文件中引入
  */
});

// router.get("/", async (ctx) => {
//   ctx.body = await new Promise((resolve, reject) => {
//     render.renderToString({ key: "value" }, (err, data) => {
//       //解析css必须使用promise
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// });

app.use(static(path.resolve(__dirname, "dist")));
app.use(router.routes());
router.get("*", async (ctx) => {
  try {
    ctx.body = await new Promise((resolve, reject) => {
      render.renderToString({ url: ctx.path }, (err, data) => {
        //解析css必须使用promise
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  } catch (e) {
    console.log(e);
    ctx.body = "Not found!";
  }
});
app.listen(3000);
