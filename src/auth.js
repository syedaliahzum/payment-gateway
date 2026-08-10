const crypto = require('crypto');
class AuthService {
  constructor() {
    this.tokens = new Map();
    this.users = [];
  }
  register(email, password) {
    if (this.users.find(u => u.email === email)) throw new Error('User exists');
    const user = {id: crypto.randomBytes(8).toString('hex'), email, password: this.hashPassword(password), createdAt: new Date()};
    this.users.push(user);
    return {id: user.id, email: user.email};
  }
  login(email, password) {
    const user = this.users.find(u => u.email === email);
    if (!user || user.password !== this.hashPassword(password)) throw new Error('Invalid');
    const token = crypto.randomBytes(32).toString('hex');
    this.tokens.set(token, user.id);
    return {token, userId: user.id};
  }
  verify(token) {
    return this.tokens.has(token);
  }
  hashPassword(pwd) {
    return crypto.createHash('sha256').update(pwd).digest('hex');
  }
}
module.exports = new AuthService();
