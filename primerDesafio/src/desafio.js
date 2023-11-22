const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  addProduct(product) {
    // Leer productos actuales del archivo
    let products = this.readProductsFromFile();

    // Validar que todos los campos sean obligatorios
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      console.error("Todos los campos son obligatorios.");
      return;
    }

    // Validar que no se repita el campo "code"
    const isCodeUnique = products.every((existingProduct) => existingProduct.code !== product.code);
    if (!isCodeUnique) {
      console.error("El código ya existe en otro producto.");
      return;
    }

    // Agregar el producto con un ID autoincrementable
    product.id = this.getNextProductId(products);
    products.push(product);

    // Guardar los productos en el archivo
    this.saveProductsToFile(products);
  }

  getProducts() {
    return this.readProductsFromFile();
  }

  getProductById(id) {
    const products = this.readProductsFromFile();
    const product = products.find((p) => p.id === id);
    if (product) {
      return product;
    } else {
      console.error("Producto no encontrado.");
    }
  }

  updateProduct(id, updatedProduct) {
    let products = this.readProductsFromFile();
    const productIndex = products.findIndex((p) => p.id === id);

    if (productIndex !== -1) {
      // Actualizar el producto sin cambiar su ID
      updatedProduct.id = id;
      products[productIndex] = updatedProduct;

      // Guardar los productos actualizados en el archivo
      this.saveProductsToFile(products);
    } else {
      console.error("Producto no encontrado.");
    }
  }

  deleteProduct(id) {
    let products = this.readProductsFromFile();
    const productIndex = products.findIndex((p) => p.id === id);

    if (productIndex !== -1) {
      // Eliminar el producto del array
      products.splice(productIndex, 1);

      // Guardar los productos actualizados en el archivo
      this.saveProductsToFile(products);
    } else {
      console.error("Producto no encontrado.");
    }
  }

  getNextProductId(products) {
    if (products.length === 0) {
      return 1;
    }
    const ids = products.map((product) => product.id);
    return Math.max(...ids) + 1;
  }

  readProductsFromFile() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      if (data) {
        return JSON.parse(data);
      }
      return [];
    } catch (error) {
      console.error("Error al leer el archivo de productos:", error);
      return [];
    }
  }

  saveProductsToFile(products) {
    try {
      fs.writeFileSync(this.path, JSON.stringify(products, null, 2), 'utf-8');
      console.log("Productos guardados en el archivo.");
    } catch (error) {
      console.error("Error al guardar productos en el archivo:", error);
    }
  }
}

// Ejemplo:
const productManager = new ProductManager('productos.json');
exports.productManager = productManager;

productManager.addProduct({
  title: "Producto 1",
  description: "Descripción del producto 1",
  price: 100,
  thumbnail: "imagen1.jpg",
  code: "12345",
  stock: 12,
});

productManager.addProduct({
  title: "Producto 2",
  description: "Descripción del producto 2",
  price: 200,
  thumbnail: "imagen2.jpg",
  code: "54321",
  stock: 5,
});

console.log(productManager.getProducts());
console.log(productManager.getProductById(1));
console.log(productManager.getProductById(3)); // Debe mostrar un error "Not found"

// Actualizar un producto
productManager.updateProduct(1, {
  title: "Producto 1 Actualizado",
  description: "Descripción actualizada",
  price: 250,
  thumbnail: "imagen1_updated.jpg",
  code: "12345",
  stock: 15,
});

console.log(productManager.getProducts());

// Eliminar un producto
productManager.deleteProduct(2);

console.log(productManager.getProducts());

module.exports = productManager;