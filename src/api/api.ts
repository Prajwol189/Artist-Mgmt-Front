import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/";

// SignUp API
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

// Login API
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

// Fetch all artists
export const fetchArtists = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}artists/`);
    return response.data; // Should return an array of artists
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch music and add artist names
export const fetchMusic = async () => {
  try {
    const [musicResponse, artistsResponse] = await Promise.all([
      axios.get(`${API_BASE_URL}music/`),
      fetchArtists(),
    ]);

    const artistsMap = new Map(
      artistsResponse.map((artist: { id: number; name: string }) => [
        artist.id,
        artist.name,
      ])
    );

    const musicData = musicResponse.data.map((song: any) => ({
      id: song.id,
      title: song.title,
      album: song.album_name, // Adjust for API field name
      genre: song.genre,
      artist: artistsMap.get(song.artist_id) || "Unknown Artist", // Map artist ID to name
    }));

    return musicData;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};
