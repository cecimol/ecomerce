import { Router } from "express";
import { resolve } from "path";
import __dirname from "../utils.js";
import ProductManager from "../managers/productManager.js";

const productRouter = Router();

const productManager = new ProductManager(
  resolve(__dirname, "../src/data/products.json")
);

productRouter.get("/", (req, res) => {
  const limit = req.query.limit;
  const products = limit
    ? productManager.getProducts().slice(0, limit)
    : productManager.getProducts();
  res.send({ products });
});

productRouter.post("/init", (req, res) => {
  productManager.createProducts();
  const products = productManager.getProducts();
  res.send({ products });
});

productRouter.get("/:pid", (req, res) => {
  const pid = req.params.pid;
  const product = productManager.getProductById(parseInt(pid));
  const response = product ? { product } : { error: "Product not found" };
  res.send(response);
});

productRouter.post("/", (req, res) => {
  const product = productManager.addProduct(
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.thumbnails,
    req.body.code,
    req.body.stock,
    req.body.status || true,
    req.body.category
  );
  if (product === "Product code already exists") {
    res.send({ error: product });
  } else {
    const io = req.app.get("socketServer");
    io.emit("product_created", product);
  }
  res.send({ product });
});

productRouter.put("/:pid", (req, res) => {
  const pid = req.params.pid;
  const product = productManager.updateProduct(parseInt(pid), req.body);
  if (product === "Product not found") {
    res.send({ error: product });
  }
  res.send({ product });
});

productRouter.delete("/:pid", (req, res) => {
  const pid = req.params.pid;
  const products = productManager.deleteProduct(parseInt(pid));
  if (products === "Product not found") {
    res.send({ error: products });
  } else {
    const io = req.app.get("socketServer");
    io.emit("product_deleted", pid);
  }
  res.send({ products });
});

export default productRouter;
