import type { Metadata } from "next";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SongsTable } from "@/components/songs-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "Songs",
  description: "Manage your songs collection",
};

export default function SongsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col h-full">
          <header className="border-b">
            <div className="flex items-center justify-between p-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Songs</h1>
                <p className="text-muted-foreground">
                  Manage your songs collection and metadata.
                </p>
              </div>
              <Button className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                Add Song
              </Button>
            </div>
          </header>
          <main className="flex-1 p-4">
            <SongsTable />
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
