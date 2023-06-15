import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/carts.routes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use public folder
app.use("/static", express.static(__dirname + "/public"));

// Use Routes
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.listen(8080, () => console.log("Servidor funcionando en el puerto 8080"));
