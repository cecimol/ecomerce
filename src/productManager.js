import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const isCodeNotRepeated = (product) => {
      return product.code !== code;
    };

    const products = this.getProducts();
    if (products.every(isCodeNotRepeated)) {
      this.lastProductIndex++;
      const product = {
        id: products.length ? products.length + 1 : 1,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
      };
      products.push(product);
      fs.writeFileSync(this.path, JSON.stringify(products));
    } else {
      console.log("Product code already exists");
    }
  }

  getProducts() {
    let products = [];
    try {
      products = JSON.parse(fs.readFileSync(this.path));
    } catch (error) {
      if (error.code !== "ENOENT") {
        console.log("There was a problem reading the file", error);
      }
    }
    return products;
  }

  getProductById(id) {
    const equalId = (product) => {
      return product.id === id;
    };
    const products = this.getProducts();
    const findedProduct = products.find(equalId);
    if (!findedProduct) {
      console.log("Product not found");
    }
    return findedProduct;
  }

  updateProduct(id, updateObject) {
    const product = this.getProductById(id);
    if (product) {
      const products = this.getProducts();
      const newProducts = products.map((oldProduct) => {
        if (oldProduct.id === product.id) {
          return {
            ...oldProduct,
            ...updateObject,
            id: product.id,
            code: product.code,
          };
        }
        return oldProduct;
      });
      fs.writeFileSync(this.path, JSON.stringify(newProducts));
    } else {
      console.log("Product not found");
    }
  }

  deleteProduct(id) {
    const products = this.getProducts();
    const newProducts = products.filter((product) => product.id !== id);
    fs.writeFileSync(this.path, JSON.stringify(newProducts));
    if (products.length === newProducts.length) {
      console.log("Product not found");
    }
  }

  createProducts() {
    this.addProduct(
      "Producto 1",
      "Este es un producto prueba",
      "200",
      "Sin imagen",
      "1",
      25
    );
    this.addProduct(
      "Producto 2",
      "Este es un producto prueba",
      "200",
      "Sin imagen",
      "2",
      25
    );
    this.addProduct(
      "Producto 3",
      "Este es un producto prueba",
      "200",
      "Sin imagen",
      "3",
      25
    );
    this.addProduct(
      "Producto 4",
      "Este es un producto prueba",
      "200",
      "Sin imagen",
      "4",
      25
    );
    this.addProduct(
      "Producto 5",
      "Este es un producto prueba",
      "200",
      "Sin imagen",
      "5",
      25
    );
    this.addProduct(
      "Producto 6",
      "Este es un producto prueba",
      "200",
      "Sin imagen",
      "6",
      25
    );
    this.addProduct(
      "Producto 7",
      "Este es un producto prueba",
      "200",
      "Sin imagen",
      "7",
      25
    );
    this.addProduct(
      "Producto 8",
      "Este es un producto prueba",
      "200",
      "Sin imagen",
      "8",
      25
    );
    this.addProduct(
      "Producto 9",
      "Este es un producto prueba",
      "200",
      "Sin imagen",
      "9",
      25
    );
    this.addProduct(
      "Producto 10",
      "Este es un producto prueba",
      "200",
      "Sin imagen",
      "10",
      25
    );
  }
}

export default ProductManager;
