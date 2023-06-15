import { Router } from "express";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import CartManager from "../managers/cartManager.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cartRouter = Router();

const cartManager = new CartManager(resolve(__dirname, "../data/carts.json"));

cartRouter.get("/", (req, res) => {
  const carts = cartManager.getCarts();
  res.send({ carts });
});

cartRouter.post("/", (req, res) => {
  const products = req.body.products;
  const cart = cartManager.addCart(products);
  res.send({ cart });
});

cartRouter.post("/init", (req, res) => {
  const carts = cartManager.init();
  res.send({ carts });
});

cartRouter.get("/:cid", (req, res) => {
  const cid = req.params.cid;
  const cart = cartManager.getCartById(parseInt(cid));
  res.send({ cart });
});

cartRouter.post("/:cid/product/:pid", (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const carts = cartManager.addProductTocart(parseInt(cid), parseInt(pid));
  res.send({ carts });
});

export default cartRouter;
