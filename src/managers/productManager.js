import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
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

  addProduct(
    title,
    description,
    price,
    thumbnails,
    code,
    stock,
    status,
    category
  ) {
    const isCodeNotRepeated = (product) => {
      return product.code !== code;
    };

    const products = this.getProducts();
    if (products.every(isCodeNotRepeated)) {
      const id = products.length ? products[products.length - 1].id + 1 : 1;
      const product = {
        id: id,
        title: title,
        description: description,
        price: price,
        thumbnails: thumbnails,
        code: code,
        stock: stock,
        status: status,
        category: category,
      };
      products.push(product);
      fs.writeFileSync(this.path, JSON.stringify(products));
      return product;
    } else {
      return "Product code already exists";
    }
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
        } else {
          return oldProduct;
        }
      });
      fs.writeFileSync(this.path, JSON.stringify(newProducts));
      return this.getProductById(id);
    } else {
      return "Product not found";
    }
  }

  deleteProduct(id) {
    const products = this.getProducts();
    const newProducts = products.filter((product) => product.id !== id);
    fs.writeFileSync(this.path, JSON.stringify(newProducts));
    if (products.length === newProducts.length) {
      return "Product not found";
    }
    return newProducts;
  }

  createProducts() {
    this.addProduct(
      "Producto 1",
      "Este es un producto prueba",
      "200",
      [],
      "1",
      25,
      true,
      "1"
    );
    this.addProduct(
      "Producto 2",
      "Este es un producto prueba",
      "200",
      [],
      "2",
      25,
      true,
      "2"
    );
    this.addProduct(
      "Producto 3",
      "Este es un producto prueba",
      "200",
      [],
      "3",
      25,
      true,
      "3"
    );
    this.addProduct(
      "Producto 4",
      "Este es un producto prueba",
      "200",
      [],
      "4",
      25,
      true,
      "4"
    );
    this.addProduct(
      "Producto 5",
      "Este es un producto prueba",
      "200",
      [],
      "5",
      25,
      true,
      "5"
    );
    this.addProduct(
      "Producto 6",
      "Este es un producto prueba",
      "200",
      [],
      "6",
      25,
      true,
      "6"
    );
    this.addProduct(
      "Producto 7",
      "Este es un producto prueba",
      "200",
      [],
      "7",
      25,
      true,
      "7"
    );
    this.addProduct(
      "Producto 8",
      "Este es un producto prueba",
      "200",
      [],
      "8",
      25,
      true,
      "8"
    );
    this.addProduct(
      "Producto 9",
      "Este es un producto prueba",
      "200",
      [],
      "9",
      25,
      true,
      "9"
    );
    this.addProduct(
      "Producto 10",
      "Este es un producto prueba",
      "200",
      [],
      "10",
      25,
      true,
      "10"
    );
  }
}

export default ProductManager;
