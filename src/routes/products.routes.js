import { Router } from "express";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import ProductManager from "../managers/productManager.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const productRouter = Router();

const productManager = new ProductManager(
  resolve(__dirname, "../data/products.json")
);

productRouter.get("/", (req, res) => {
  const limit = req.query.limit;
  const products = limit
    ? productManager.getProducts().slice(0, limit)
    : productManager.getProducts();
  res.send({ products });
});

productRouter.get("/init", (req, res) => {
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
  }
  res.send({ product });
});

productRouter.put("/", (req, res) => {
  const product = productManager.updateProduct(req.body.id, ...req.body);
  if (product === "Product not found") {
    res.send({ error: product });
  }
  res.send({ product });
});

productRouter.delete("/", (req, res) => {
  const products = productManager.deleteProduct(req.body.id);
  if (products === "Product not found") {
    res.send({ error: product });
  }
  res.send({ products });
});

export default productRouter;
