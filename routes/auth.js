const express = require('express');
const router = express.Router();
const { register, login, getUser } = require('../controllers/authController');
const { authenticate } = require('../middlewares/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticate, getUser);

module.exports = router;