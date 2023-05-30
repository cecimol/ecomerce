import express from "express";
import ProductManager from "./productManager.js";

const app = express();
const productManager = new ProductManager("products.txt");

app.post("/products", (req, res) => {
  productManager.createProducts();
  const products = productManager.getProducts();
  res.send({ products });
});

app.get("/products", (req, res) => {
  const limit = req.query.limit;
  const products = limit
    ? productManager.getProducts().slice(0, limit)
    : productManager.getProducts();
  res.send({ products });
});

app.get("/products/:pid", (req, res) => {
  const pid = req.params.pid;
  const product = productManager.getProductById(parseInt(pid));
  const response = product ? { product } : { error: "Product not found" };
  res.send(response);
});

app.listen(8080, () => console.log("Servidor funcionando en el puerto 8080"));
