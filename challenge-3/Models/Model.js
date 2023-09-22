const crypto = require('crypto');

class Model {
  constructor(model) {
    this.model = model;
  }

  create(request){
    this.model.push(request);

    return request;
  }

  delete(item){
    const result = this.model.splice(item, 1);
    return result;
  }

  all() {
    return this.model
  }

  where(name, value) {
    return this.model.filter((model) => {
      return model[name] == value;
    })
  }

  whereNot(name, value) {
    return this.model.filter((model) => {
      return model[name] != value;
    })
  }

  whereIn(name, value) {
    return this.model.filter((model) => {
      if (value instanceof Array) {
        return value.includes(model[name])
      }
    })
  }

  whereNotIn(name, value) {
    return this.model.filter((model) => {
      if (value instanceof Array) {
        return !value.includes(model[name])
      }
    })
  }

  find(id) {
    return this.model.find((model) => model.id === Number(id))
  }

  pluck(name, options) {
    const result = [];
    switch (options) {
      case "all":
        this.model.map((model) => {
          result.push(model[name]);
        });
        return result;

      case "first":
        return this.model[0][name];

      case "unique":
        this.model.map((model) => {
          if (!result.includes(model[name])) {
            result.push(model[name]);
          }
        });
        return result;

      default:
        throw new Error("Method is undefined");
    }
  }

  unique(name) {
    const result = [];
    const seen = new Set();
    this.model.map((model) => {
      if (!seen.has(model[name])) {
        seen.add(model[name]);
        result.push(model);
      }
    })

    return result;
  }

  generateUUID() {
    const uuid = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.randomBytes(1)[0] & 15 >> c / 4).toString(16)
    );
  
    return uuid;
  }

  generateId() {
    // Mengecek apakah array kosong
    if (this.model.length === 0) {
      return 1; // Jika array kosong, ID pertama adalah 1
    }
  
    // Mengambil ID terakhir dalam array
    const lastItem = this.model[this.model.length - 1];
  
    // Menambahkan 1 ke ID terakhir untuk mendapatkan ID baru
    const newId = lastItem.id + 1;
  
    return newId;
  }
  
}

module.exports = Model;