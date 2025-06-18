const Playlist = require('../models/Playlist');
const User = require('../models/User');

exports.createPlaylist = async (req, res) => {
  try {
    const { name, description, isPublic } = req.body;
    const playlist = new Playlist({
      name,
      description,
      createdBy: req.user._id,
      isPublic: isPublic || false
    });
    await playlist.save();
    
    await User.findByIdAndUpdate(req.user._id, {
      $push: { playlists: playlist._id }
    });

    res.status(201).json(playlist);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getUserPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ createdBy: req.user._id });
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getPlaylistById = async (req, res) => {
  try {
    const playlist = await Playlist.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    });
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updatePlaylist = async (req, res) => {
  try {
    const { name, description, isPublic } = req.body;
    const playlist = await Playlist.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      { name, description, isPublic },
      { new: true }
    );
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id
    });
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }
    
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { playlists: playlist._id }
    });

    res.json({ message: 'Playlist deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.addSongToPlaylist = async (req, res) => {
  try {
    const { spotifyId, title, artist, album, imageUrl, duration } = req.body;
    
    const playlist = await Playlist.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      {
        $push: {
          songs: { spotifyId, title, artist, album, imageUrl, duration }
        }
      },
      { new: true }
    );
    
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }
    
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.removeSongFromPlaylist = async (req, res) => {
  try {
    const { songId } = req.params;
    
    const playlist = await Playlist.findOneAndUpdate(
      { _id: req.params.playlistId, createdBy: req.user._id },
      {
        $pull: {
          songs: { _id: songId }
        }
      },
      { new: true }
    );
    
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }
    
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};