const routerProductos = require("./productRouter");

function routerApi(app) {
  app.use("/api/productos-test", routerProductos);
}

module.exports = routerApi;
