const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { getProfile } = require('../controllers/userController');

router.get('/profile', authMiddleware, getProfile);
// router.get('/me', authMiddleware, getCurrentUser);

module.exports = router;
