const pool = require('../db/db');
const getProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'SELECT id, email, phone, first_name, last_name FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка при получении профиля' });
  }
};

module.exports = { getProfile };