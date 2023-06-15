import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/carts.routes.js";
import viewsRouter from "./routes/views.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use public folder
app.use(express.static(__dirname + "/public"));

// Use Routes
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);

// handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// http server
const httpServer = app.listen(8080, () =>
  console.log("Servidor funcionando en el puerto 8080")
);

// socket.io server
const socketServer = new Server(httpServer);
socketServer.on("connection", (socket) => {
  console.log("Websocket iniciado");

  socket.on("message", (data) => {
    console.log(data);
  });
});

app.set("socketServer", socketServer);
