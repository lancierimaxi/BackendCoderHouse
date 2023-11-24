const ProductManager = require("./desafio");

const productManager = new ProductManager("productos.json");

const app = async () => {
  try {
    const id2 = await productManager.save({ title: "Goma", price: 57.75 });
    const id3 = await productManager.save({ title: "Lapicera", price: 100 });
    const id1 = await productManager.save({ title: "Regla", price: 75.66 });

    console.log(id1, id2, id3); // 1, 2, 3

    const object2 = await productManager.getById(2);
    console.log(object2); // { title: 'Goma', price: 57.75, id: 2 }

    await productManager.deleteById(2);

    const allCurrentObjects = await productManager.getAll();
    console.log(allCurrentObjects);
  } catch (error) {
    console.error("Error in main:", error);
  }
};
app();
