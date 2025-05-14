const express = require('express');
const cors = require('cors');
require('dotenv').config();

const initDB = require('./db/init')
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/users', require('./routes/users'));
app.use('/api/news', require('./routes/news'));


const PORT = process.env.PORT || 5000;

(async () => {
  await initDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})();
