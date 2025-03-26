"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/nav-user";
import Image from "next/image";
import Link from "next/link";
import { NavMain } from "@/components/nav-main"; // Import from separate file
import { SquareTerminal, Bot, Music, Disc } from "lucide-react"; // Import other icons

import logo from "../assets/logo.png"; // Import the image directly

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal, // Keeping the existing icon or you can change it
    },
    {
      title: "Artist",
      url: "/artist",
      icon: Music, // Changed icon for Artist
    },
    {
      title: "Album",
      url: "/album",
      icon: Disc, // Changed icon for Album
    },
    {
      title: "Song",
      url: "/song",
      icon: Bot, // Keeping the existing icon for Song
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link href="/">
          <Image src={logo} alt="Logo" width={100} height={50} />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
