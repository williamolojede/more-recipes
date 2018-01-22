class LocalStorageMock {
  constructor() {
    this.store = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo4fSwiaWF0IjoxNTE2MzYzMjU2LCJleHAiOjE1MTYzNjY4NTZ9.IX6HbbD574E1fcTdRi8vDIqy7GqrIdV_QOHs-xJiGYE'
    };
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();
