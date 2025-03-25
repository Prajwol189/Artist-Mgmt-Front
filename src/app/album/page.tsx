"use client";

import { AlbumsTable } from "@/components/album-table"; // Make sure the path is correct based on your file structure

export default function AlbumsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-6">Albums</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <AlbumsTable />
      </div>
    </div>
  );
}
