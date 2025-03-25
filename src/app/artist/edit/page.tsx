import { ArtistForm } from "@/components/artist-form";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function AddArtistPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Artist</h2>
          <ArtistForm />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
