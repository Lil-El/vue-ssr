const path = require("path");
const fs = require("fs");
const template = fs.readFileSync(
  path.resolve(__dirname, "./template.html"),
  "utf8"
);
const Vue = require("vue");
const Koa = require("koa");
const VueServerRenderer = require("vue-server-renderer");
const Router = require("koa-router");

const router = new Router();
const app = new Koa();

const vm = new Vue({
  data() {
    return { name: "yxd" };
  },
  template: `
  `,
});

const render = VueServerRenderer.createRenderer({ template });
router.get("/", async (ctx) => {
  ctx.body = await render.renderToString(vm);
});
app.use(router.routes);
app.listen(3000);
