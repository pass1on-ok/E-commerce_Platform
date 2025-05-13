const pool = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { email, phone, first_name, last_name, password } = req.body;

  if (!email && !phone) return res.status(400).json({ message: 'Email или номер обязателен' });

  try {
    const existing = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR phone = $2',
      [email, phone]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'Пользователь уже существует' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (email, phone, first_name, last_name, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [email, phone, first_name, last_name, hashedPassword]
    );

    const user = result.rows[0];
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user: { id: user.id, email: user.email, phone: user.phone, first_name, last_name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

const login = async (req, res) => {
  const { email, phone, password } = req.body;

  if (!email && !phone) return res.status(400).json({ message: 'Email или номер обязателен' });

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR phone = $2',
      [email, phone]
    );

    const user = result.rows[0];
    if (!user) return res.status(400).json({ message: 'Пользователь не найден' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Неверный пароль' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user: { id: user.id, email: user.email, phone: user.phone, first_name: user.first_name, last_name: user.last_name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports = { register, login };
