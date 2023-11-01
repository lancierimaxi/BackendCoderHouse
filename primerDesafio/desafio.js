class ProductManager {
    constructor() {
      this.products = [];
      this.nextId = 1; // Para generar IDs autoincrementables
    }
  
    addProduct(product) {
      // Validar que todos los campos sean obligatorios
      if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
        console.error("Todos los campos son obligatorios.");
        return;
      }
  
      // Validar que no se repita el campo "code"
      const isCodeUnique = this.products.every((existingProduct) => existingProduct.code !== product.code);
      if (!isCodeUnique) {
        console.error("El código ya existe en otro producto.");
        return;
      }
  
      // Agregar el producto con un ID autoincrementable
      product.id = this.nextId++;
      this.products.push(product);
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find((p) => p.id === id);
      if (product) {
        return product;
      } else {
        
       
  console.error("Producto no encontrado.");
      }
    }
  }
  
  // Ejemplo de uso:
  const productManager = new ProductManager();
  
  
  productManager.addProduct({
    
    title: "producto prueba",
    description:"Este es un producto prueba",
    price:200,
    thumbnail:"Sin imagen",
    code:"abc123",
    stock:25

  });
  
  console.log(productManager.getProducts());
  console.log(productManager.getProductById(1));
  console.log(productManager.getProductById(3)); // Debe mostrar un error