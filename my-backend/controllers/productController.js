const pool = require('../db/db');


const createProduct = async (req, res) => {
  const { name, description, price } = req.body;
  const user_id = req.user.id;

  try {
    const result = await pool.query(
      'INSERT INTO products (user_id, name, description, price) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, name, description, price]
    );

    const product = result.rows[0];
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка при создании товара' });
  }
};


const getProducts = async (req, res) => {

  try {
    const result = await pool.query(
      'SELECT * FROM products',
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка при получении товаров' });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM products WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Товар не найден или не ваш' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка при получении товара' });
  }
};


const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  const user_id = req.user.id;

  try {
    const result = await pool.query(
      'UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4 AND user_id = $5 RETURNING *',
      [name, description, price, id, user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Товар не найден или не ваш' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка при обновлении товара' });
  }
};


const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  try {
    const result = await pool.query(
      'DELETE FROM products WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Товар не найден или не ваш' });
    }

    res.json({ message: 'Товар удалён' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка при удалении товара' });
  }
};

module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct };
