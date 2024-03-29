const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
// const Container = require("./ddbb/clase-Container");
const Mensajes = require("./ddbb/clase-Mensajes");
const { knexProduct, knexMessage } = require("./config/mariaDB");
const routerApi = require("./routes");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

// instancio objetos de las clases Container y Mensajes
// const productos = new Container(knexProduct, "productos");
const mensajes = new Mensajes(knexMessage, "mensajes");

//codificacion
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//configuracion de Router
routerApi(app);

//? PRODUCTOS
//  // PRODUCTOS
//   console.log(`Nuevo cliente ${socket.id} conectado`);
//   socket.emit("productos", await productos.getAll()); // envio a los clientes nuevos conectado los productos
// // recibo el producto  nuevo,  lo guardo y envio la lista
//   socket.on("agregarProducto", async (producto) => {
// // console.log(producto);
//     await productos.save(producto);
//     io.sockets.emit("productos", await productos.getAll());
//   });

// ++++++++++++++++++++++++++++++++++++++++++++++++
// Socket.io
io.on("connection", async (socket) => {
  //? MENSAJES
  // envio todos los mensajes a los conectados
  socket.emit("mensajes", await mensajes.getAll());

  socket.on("new-message", async (data) => {
    await mensajes.save(data);
    io.sockets.emit("mensajes", await mensajes.getAll());
  });
});

/**++++++++++++++++++++++++++++++++++++++++++++++ */
// Server Listen

const PORT = process.env.PORT || 8080;

const connectedServer = httpServer.listen(PORT, () => {
  console.log(
    `Servidor Http con Websockets escuchando en el puerto ${
      connectedServer.address().port
    }`
  );
});

connectedServer.on("error", (error) =>
  console.log(`Error en el server:${error}`)
);
