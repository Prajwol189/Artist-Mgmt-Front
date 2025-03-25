"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// API base URL
const API_BASE_URL = "http://127.0.0.1:8000/api/albums/";

// Fetch albums with ID and Name
const fetchAlbums = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}albums/`);
    console.log("Fetched albums:", response.data); // Log the entire response for debugging
    return response.data; // Array of albums with {id, name}
  } catch (error: any) {
    console.error("Error fetching albums:", error);
    toast.error("Error fetching albums.");
    return []; // Return empty array if there's an error
  }
};

export function SongForm() {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    release_date: "",
    genre: "",
    album: "", // Stores the selected album ID
    duration: "",
  });
  const [albums, setAlbums] = useState<{ id: number; name: string }[]>([]); // Store albums as an array of {id, name}
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch albums on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedAlbums = await fetchAlbums();
        setAlbums(fetchedAlbums); // Store albums in state
      } catch (error) {
        console.error("Error fetching albums:", error);
        toast.error("Error fetching albums.");
      }
    };

    loadData();
  }, []);

  // Handle form data change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(API_BASE_URL, formData);

      if (response.status === 201) {
        toast.success("Song added successfully!");
        router.push("/songs");
      } else {
        throw new Error("Failed to add song");
      }
    } catch (error: any) {
      console.error("Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Error adding song.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
      <div>
        <Label>Title</Label>
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label>Artist</Label>
        <Input
          name="artist"
          value={formData.artist}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label>Release Date</Label>
        <Input
          type="date"
          name="release_date"
          value={formData.release_date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label>Album</Label>
        <Select
          onValueChange={(value) => setFormData({ ...formData, album: value })}
          value={formData.album}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select album" />
          </SelectTrigger>
          <SelectContent>
            {albums.length > 0 ? (
              albums.map((album) => (
                <SelectItem key={album.id} value={String(album.id)}>
                  {album.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem disabled>No albums available</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Genre</Label>
        <Input
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label>Duration (in seconds)</Label>
        <Input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Song"}
      </Button>
    </form>
  );
}
