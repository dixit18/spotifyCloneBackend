const axios = require('axios');
const qs = require('qs');

let accessToken = '';
let tokenExpiration = 0;

const getAccessToken = async () => {
  if (Date.now() < tokenExpiration) return accessToken;

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const authOptions = {
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify({
      grant_type: 'client_credentials'
    })
  };

  try {
    const response = await axios(authOptions);
    accessToken = response.data.access_token;
    tokenExpiration = Date.now() + (response.data.expires_in * 1000);
    return accessToken;
  } catch (err) {
    console.error('Error getting Spotify access token:', err);
    throw err;
  }
};

exports.searchTracks = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const token = await getAccessToken();
    const response = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const tracks = response.data.tracks.items.map(track => ({
      id: track.id,
      title: track.name,
      artist: track.artists.map(artist => artist.name).join(', '),
      album: track.album.name,
      imageUrl: track.album.images[0]?.url,
      duration: track.duration_ms,
      previewUrl: track.preview_url
    }));

    res.json(tracks);
  } catch (err) {
    console.error('Spotify search error:', err);
    res.status(500).json({ message: 'Error searching Spotify', error: err.message });
  }
};

exports.getTrackDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const token = await getAccessToken();

    const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const track = response.data;
    const trackDetails = {
      id: track.id,
      title: track.name,
      artist: track.artists.map(artist => artist.name).join(', '),
      album: track.album.name,
      imageUrl: track.album.images[0]?.url,
      duration: track.duration_ms,
      previewUrl: track.preview_url
    };

    res.json(trackDetails);
  } catch (err) {
    console.error('Error getting track details:', err);
    res.status(500).json({ message: 'Error getting track details', error: err.message });
  }
};