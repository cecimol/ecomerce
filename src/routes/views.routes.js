import { Router } from "express";
import { resolve } from "path";
import __dirname from "../utils.js";
import ProductManager from "../managers/productManager.js";

const viewsRouter = Router();

const productManager = new ProductManager(
  resolve(__dirname, "../src/data/products.json")
);

viewsRouter.get("/", (req, res) => {
  const products = productManager.getProducts();
  return res.render("home", { layout: false, products });
});

viewsRouter.get("/realtimeProducts", (req, res) => {
  const products = productManager.getProducts();
  return res.render("realtimeProducts", { layout: false, products });
});

export default viewsRouter;
