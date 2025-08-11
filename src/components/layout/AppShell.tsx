import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarProvider, SidebarSeparator, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Header } from "./Header";
import { useData } from "@/context/DataContext";
import { Folder, Inbox, Settings, Users, Archive, Trash2, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export const AppShell = () => {
  const { collections } = useData();
  const mainItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/collections/c1", label: "Inbox", icon: Inbox },
    { to: "/people", label: "People", icon: Users },
    { to: "/archive", label: "Archive", icon: Archive },
    { to: "/trash", label: "Trash", icon: Trash2 },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <SidebarProvider>
      <Sidebar className="border-r" collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center justify-between px-2">
            <Link to="/" aria-label="VibeDrop home" className="flex items-center gap-2">
              <span className="h-8 w-8 rounded-md bg-gradient-primary" aria-hidden />
              <span className="text-sm font-semibold group-data-[collapsible=icon]:hidden">VibeDrop</span>
            </Link>
            <SidebarTrigger />
          </div>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarGroupContent>
              <nav className="flex flex-col gap-1">
                {mainItems.map((item) => (
                  <NavLink key={item.to} to={item.to} end className={({ isActive }) => cn("flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted/60", isActive && "bg-muted text-primary font-medium") }>
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Collections</SidebarGroupLabel>
            <SidebarGroupContent>
              <nav className="flex flex-col gap-1">
                {collections.map((c) => (
                  <NavLink key={c.id} to={`/collections/${c.id}`} className={({ isActive }) => cn("flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted/60", isActive && "bg-muted text-primary font-medium") }>
                    <Folder className="h-4 w-4" />
                    <span className="truncate">{c.title}</span>
                    {c.counts !== undefined && (
                      <span className="ml-auto text-xs text-muted-foreground">{c.counts}</span>
                    )}
                  </NavLink>
                ))}
              </nav>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <Button variant="secondary" size="sm" asChild>
            <Link to="/collections/c1">New collection</Link>
          </Button>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <Header />
        <div className="container py-6">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
