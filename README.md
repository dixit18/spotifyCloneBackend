# Music Playlist System - Backend

This is the backend server for the Music Playlist System. It provides RESTful APIs for user authentication, playlist management, and integration with the Spotify API.

## Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd music-playlist-system/server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   - Copy the sample environment file and fill in your credentials:
     ```bash
     cp sample.env .env
     ```
   - Open `.env` and set the variables:


4. **Obtain Spotify API Credentials**
   - Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications)
   - Log in with your Spotify account
   - Click on "Create an App"
   - Enter an app name and description
   - After creation, you will see your **Client ID** and **Client Secret**
   - Copy these values into your `.env` file

5. **Run the server**
   ```bash
   npm start
   ```
   The server will start on the port specified in your `.env` file (default is usually 3000).

## Project Structure
```
server/
  app.js
  controllers/
  middlewares/
  models/
  routes/
  server.js
```

## API Endpoints
- Authentication: `/api/auth`
- Playlists: `/api/playlists`
- Spotify Integration: `/api/spotify`
