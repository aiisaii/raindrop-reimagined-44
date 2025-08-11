import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CollectionDetail from "./pages/CollectionDetail";
import SearchPage from "./pages/Search";
import Settings from "./pages/Settings";
import Trash from "./pages/Trash";
import Archive from "./pages/Archive";
import People from "./pages/People";
import { AppShell } from "@/components/layout/AppShell";
import { DataProvider } from "@/context/DataContext";
import { ThemeProvider } from "next-themes";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <DataProvider>
            <Routes>
              <Route path="/" element={<AppShell /> }>
                <Route index element={<Index />} />
                <Route path="collections/:id" element={<CollectionDetail />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="settings" element={<Settings />} />
                <Route path="trash" element={<Trash />} />
                <Route path="archive" element={<Archive />} />
                <Route path="people" element={<People />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </DataProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
