const express = require('express');
const cors = require('cors');
const db = require('./database');
const auth = require('./auth');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    console.log(`${req.method} ${req.path} ${res.statusCode} ${Date.now() - start}ms`);
  });
  next();
});
app.get('/health', (req, res) => res.json({status: 'healthy', uptime: process.uptime()}));
app.post('/auth/register', (req, res) => {
  try {
    const user = auth.register(req.body.email, req.body.password);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});
app.post('/auth/login', (req, res) => {
  try {
    const result = auth.login(req.body.email, req.body.password);
    res.json(result);
  } catch (err) {
    res.status(401).json({error: err.message});
  }
});
app.get('/api/data', (req, res) => {
  const {limit = 10, offset = 0} = req.query;
  const data = db.data.slice(offset, offset + parseInt(limit));
  res.json({items: data, total: db.data.length});
});
app.post('/api/data', (req, res) => {
  if (!auth.verify(req.headers.authorization?.split(' ')[1])) return res.status(401).json({error: 'Unauthorized'});
  const item = {...req.body, createdAt: new Date()};
  db.data.push(item);
  res.status(201).json(item);
});
app.get('/api/stats', (req, res) => res.json({totalUsers: db.users.length, totalItems: db.data.length}));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({error: 'Internal server error'});
});
const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`✅ Server on port ${PORT}`));
}
module.exports = app;
