"use client";
import axios from "axios";
import { useState } from "react";
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

// Update API base URL
const API_BASE_URL = "http://127.0.0.1:8000/api/artists/";

export function ArtistForm() {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    address: "",
    first_release_year: "",
    no_of_albums_released: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const startTime = performance.now(); // Start timer

    try {
      const response = await axios.post(API_BASE_URL, {
        ...formData,
        no_of_albums_released: Number(formData.no_of_albums_released),
      });

      const endTime = performance.now(); // End timer
      console.log(`API response time: ${endTime - startTime}ms`);

      if (response.status === 201) {
        toast.success("Artist added successfully!");
        router.push("/artist");
      } else {
        throw new Error("Failed to add artist");
      }
    } catch (error: any) {
      console.error("Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Error adding artist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
      <div>
        <Label>Name</Label>
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label>Date of Birth</Label>
        <Input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label>Gender</Label>
        <Select
          onValueChange={(value) => setFormData({ ...formData, gender: value })}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="m">Male</SelectItem>
            <SelectItem value="o">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Address</Label>
        <Input
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label>First Release Year</Label>
        <Input
          type="date" // Change from "number" to "date"
          name="first_release_year"
          value={formData.first_release_year}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label>Number of Albums Released</Label>
        <Input
          type="number"
          name="no_of_albums_released"
          value={formData.no_of_albums_released}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Artist"}
      </Button>
    </form>
  );
}
