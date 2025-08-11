import React, { createContext, useContext, useMemo, useState } from "react";
import data from "@/data/sample.json";
import { toast } from "@/hooks/use-toast";

export type Collection = {
  id: string;
  title: string;
  cover?: string;
  parent?: string | null;
  counts?: number;
};

export type Bookmark = {
  id: string;
  title: string;
  url: string;
  excerpt?: string;
  image?: string;
  collectionId: string;
  tags: string[];
  createdAt: string;
};

type DataState = {
  collections: Collection[];
  bookmarks: Bookmark[];
  tags: string[];
  users: { id: string; name: string; avatar?: string }[];
};

type DataContextType = DataState & {
  addBookmark: (b: Omit<Bookmark, "id" | "createdAt">) => Promise<Bookmark>;
  updateBookmark: (b: Bookmark) => Promise<void>;
  deleteBookmark: (id: string) => Promise<void>;
  moveBookmark: (id: string, collectionId: string) => Promise<void>;
};

const DataContext = createContext<DataContextType | null>(null);

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
};

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<DataState>({
    collections: data.collections,
    bookmarks: data.bookmarks,
    tags: data.tags,
    users: data.users,
  });

  const simulate = (fn: () => void, message: string) =>
    new Promise<void>((resolve) => {
      toast({ title: message });
      setTimeout(() => {
        fn();
        resolve();
        toast({ title: "Saved", description: "Changes applied" });
      }, 450);
    });

  const addBookmark: DataContextType["addBookmark"] = async (b) => {
    const newBookmark: Bookmark = {
      ...b,
      id: `b${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
    };
    await simulate(() =>
      setState((s) => ({ ...s, bookmarks: [newBookmark, ...s.bookmarks] })),
      "Adding bookmark…"
    );
    return newBookmark;
  };

  const updateBookmark: DataContextType["updateBookmark"] = async (b) => {
    await simulate(
      () =>
        setState((s) => ({
          ...s,
          bookmarks: s.bookmarks.map((x) => (x.id === b.id ? b : x)),
        })),
      "Updating bookmark…"
    );
  };

  const deleteBookmark: DataContextType["deleteBookmark"] = async (id) => {
    await simulate(
      () =>
        setState((s) => ({
          ...s,
          bookmarks: s.bookmarks.filter((x) => x.id !== id),
        })),
      "Deleting bookmark…"
    );
  };

  const moveBookmark: DataContextType["moveBookmark"] = async (id, collectionId) => {
    await simulate(
      () =>
        setState((s) => ({
          ...s,
          bookmarks: s.bookmarks.map((x) => (x.id === id ? { ...x, collectionId } : x)),
        })),
      "Moving bookmark…"
    );
  };

  const value = useMemo(
    () => ({
      ...state,
      addBookmark,
      updateBookmark,
      deleteBookmark,
      moveBookmark,
    }),
    [state]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
