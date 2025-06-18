const express = require('express');
const router = express.Router();
const {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist
} = require('../controllers/playlistController');
const { authenticate } = require('../middlewares/auth');

router.post('/', authenticate, createPlaylist);
router.get('/', authenticate, getUserPlaylists);
router.get('/:id', authenticate, getPlaylistById);
router.put('/:id', authenticate, updatePlaylist);
router.delete('/:id', authenticate, deletePlaylist);
router.post('/:id/songs', authenticate, addSongToPlaylist);
router.delete('/:playlistId/songs/:songId', authenticate, removeSongFromPlaylist);

module.exports = router;