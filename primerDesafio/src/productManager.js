import fs from "fs"
//const { v4: uuidv4 } = require('uuid');

class ProductManager {
    constructor(fileName) {
      this._filename = fileName;
      this.init();
    }
  
    async init() {
      try {
        await this._readFileOrCreateNewOne();
      } catch (error) {
        console.log(
          `Error code: ${error.code} | There was an unexpected error when trying to initialize ${this._filename}`
        );
      }
    }
  
    async _readFileOrCreateNewOne() {
      try {
        await fs.promises.readFile(this._filename, 'utf-8');
      } catch (error) {
        if (error.code === 'ENOENT') {
          await this._createEmptyFile();
        } else {
          console.log(
            `Error code: ${error.code} | There was an unexpected error when trying to read ${this._filename}`
          );
        }
      }
    }
  
    async _createEmptyFile() {
      fs.writeFile(this._filename, '[]', (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log(
            `File ${this._filename} was created since it didn't exist in the system`
          );
        }
      });
    }
  

  async getById(id) {
    try {
      const data = await this.getData();
      const parsedData = JSON.parse(data);
      return parsedData.find((producto) => producto.id === id);
    } catch (error) {
      console.log(
        `Error Code: ${error.code} | There was an error when trying to get an element by its ID (${id})`
      );
    }
  }

  async deleteById(id) {
    try {
      const data = await this.getData();
      const parsedData = JSON.parse(data);
      const objectIdToBeRemoved = parsedData.find(
        (producto) => producto.id === id
      );

      if (objectIdToBeRemoved) {
        const index = parsedData.indexOf(objectIdToBeRemoved);
        parsedData.splice(index, 1);
        await fs.promises.writeFile(
          this._filename,
          JSON.stringify(parsedData)
        );
      } else {
        console.log(`ID ${id} does not exist in the file`);
        return null;
      }
    } catch (error) {
      console.log(
        `Error Code: ${error.code} | There was an error when trying to delete an element by its ID (${id})`
      );
    }
  }

  async save(object) {
    try {
      const allData = await this.getData();
      const parsedData = JSON.parse(allData);

      object.id = uuidv4();
      parsedData.push(object);

      await fs.promises.writeFile(
        this._filename,
        JSON.stringify(parsedData)
      );
      return object.id;
    } catch (error) {
      console.log(
        `Error Code: ${error.code} | There was an error when trying to save an element`
      );
    }
  }

  async save(object) {
    try {
      const allData = await this.getData();
      const parsedData = JSON.parse(allData);

      object.id = uuidv4();
      parsedData.push(object);

      await fs.promises.writeFile(
        this._filename,
        JSON.stringify(parsedData)
      );
      return object.id;
    } catch (error) {
      console.log(
        `Error code: ${error.code} | There was an error when trying to save an element`
      );
    }
  }

  async getData() {
    const data = await fs.promises.readFile(this._filename, 'utf-8');
    return data;
  }

  async getAll() {
    try {
      const data = await this.getData();

      // Verificar si el archivo está vacío antes de analizar JSON
      if (!data.trim()) {
        return [];
      }

      return JSON.parse(data);
    } catch (error) {
      console.log(
        `Error Code: ${error.code} | There was an error when trying to parse data in getAll`
      );
    }
  }

}

export default ProductManager;