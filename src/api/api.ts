import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/";

// SignUp API (no changes here)
export const signUp = async (userData: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
  dob?: string;
  gender: "m" | "f" | "o";
  address?: string;
  role_type: "super_admin" | "artist_manager" | "artist";
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}users/signup/`, userData);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Login API (no changes here)
export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}users/login/`,
      credentials
    );
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch all albums (for Read)
export const fetchAlbums = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}albums/`);
    return response.data; // Should return an array of albums
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Create a new album (for Create)
export const createAlbum = async (albumData: {
  name: string;
  release_date: string; // should be in 'YYYY-MM-DD' format
  artist_id: number;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}albums/`, albumData);
    return response.data; // Should return the created album data
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Update an existing album (for Update)
export const updateAlbum = async (
  albumId: number,
  albumData: {
    name?: string;
    release_date?: string;
    artist_id?: number;
  }
) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}albums/${albumId}/`,
      albumData
    );
    return response.data; // Should return the updated album data
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Delete an album (for Delete)
export const deleteAlbum = async (albumId: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}albums/${albumId}/`);
    return response.data; // Should return a success message
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch music with artist and album names (no changes here)
export const fetchMusic = async () => {
  try {
    // Fetch music, artists, and albums data in parallel
    const [musicResponse, artistsResponse, albumsResponse] = await Promise.all([
      axios.get(`${API_BASE_URL}music/`),
      fetchArtists(), // This should return the list of artists
      fetchAlbums(), // This should return the list of albums
    ]);

    // Check if artistsResponse contains the expected data
    console.log("Fetched artists:", artistsResponse);

    // Create a map of artist IDs to artist names
    const artistsMap = new Map(
      artistsResponse.map((artist: { id: number; name: string }) => [
        artist.id,
        artist.name,
      ])
    );

    // Check if albumsResponse contains the expected data
    console.log("Fetched albums:", albumsResponse);

    // Create a map of album IDs to album names
    const albumsMap = new Map(
      albumsResponse.map((album: { id: number; name: string }) => [
        album.id,
        album.name,
      ])
    );

    // Map the music data with the artist name, album name, and other necessary fields
    const musicData = musicResponse.data.map((song: any) => ({
      id: song.id,
      title: song.title,
      album: albumsMap.get(song.album_id) || "Unknown Album", // Map album ID to name
      genre: song.genre,
      artist: artistsMap.get(song.artist_id) || "Unknown Artist", // Map artist ID to name
    }));

    // Log the mapped music data to ensure it's correct
    console.log("Mapped music data:", musicData);

    return musicData; // Return the modified music data
  } catch (error: any) {
    console.error("Error fetching music:", error);
    throw error.response ? error.response.data : error.message;
  }
};
