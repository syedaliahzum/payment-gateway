const db = {
  users: [],
  data: [],
  cache: new Map(),
  async connect() {
    console.log('Database connected');
    return true;
  },
  async insert(collection, doc) {
    if (!this[collection]) this[collection] = [];
    this[collection].push({...doc, id: Date.now()});
    return doc;
  },
  async findAll(collection) {
    return this[collection] || [];
  },
  async findById(collection, id) {
    return this[collection]?.find(item => item.id === id);
  },
  async update(collection, id, data) {
    const idx = this[collection]?.findIndex(item => item.id === id);
    if (idx >= 0) {
      this[collection][idx] = {...this[collection][idx], ...data};
      return this[collection][idx];
    }
    return null;
  },
  async delete(collection, id) {
    this[collection] = this[collection]?.filter(item => item.id !== id);
    return true;
  }
};
module.exports = db;
