const express = require('express');
const router = express.Router();
const { searchTracks, getTrackDetails } = require('../controllers/spotifyController');
const { authenticate } = require('../middlewares/auth');

router.get('/search', authenticate, searchTracks);
router.get('/tracks/:id', authenticate, getTrackDetails);

module.exports = router;