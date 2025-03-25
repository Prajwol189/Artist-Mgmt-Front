import { SongForm } from "@/components/song-form";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function AddSongPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Song</h2>
          <SongForm />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
