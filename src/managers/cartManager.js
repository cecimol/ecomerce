import fs from "fs";

class CartManager {
  constructor(path) {
    this.path = path;
    this.lastCartIndex = 0;
  }

  getCarts() {
    let carts = [];
    try {
      carts = JSON.parse(fs.readFileSync(this.path));
    } catch (error) {
      if (error.code !== "ENOENT") {
        console.log("There was a problem reading the file", error);
      }
    }
    return carts;
  }

  getCartById(id) {
    const equalId = (cart) => {
      return cart.id === id;
    };
    const carts = this.getCarts();
    const findedCart = carts.find(equalId);
    if (!findedCart) {
      console.log("Cart not found");
    }
    return findedCart;
  }

  addCart(products) {
    const carts = this.getCarts();
    const id = carts.length ? carts[carts.length - 1].id + 1 : 1;
    this.lastCartIndex++;
    const cart = {
      id: id,
      products: products,
    };
    carts.push(cart);
    fs.writeFileSync(this.path, JSON.stringify(carts));
    return cart;
  }

  addProductTocart(cartId, productId) {
    const cart = this.getCartById(cartId);
    if (cart && cart.length) {
      const newCarts = this.getCarts().filter((cart) => cart.id !== cartId);
      const productIndexInCart = cart.products.findIndex(
        (product) => product.id === productId
      );
      if (productIndexInCart === -1) {
        // The product is not in the cart
        cart.products.push({ id: productId, quantity: 1 });
      } else {
        cart.products[productIndexInCart].quantity =
          cart.products[productIndexInCart].quantity + 1;
      }
      newCarts.push(cart);
      fs.writeFileSync(this.path, JSON.stringify(newCarts));
      return carts.getCartById(cartId);
    } else {
      return "Cart not found";
    }
  }
}

export default CartManager;
