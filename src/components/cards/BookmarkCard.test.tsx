import { render } from "@testing-library/react";
import { BookmarkCard } from "./BookmarkCard";
import { DataProvider } from "@/context/DataContext";
import { test, expect } from "vitest";

const item = {
  id: "b-test",
  title: "Test Bookmark",
  url: "https://example.com",
  excerpt: "Example excerpt",
  image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
  collectionId: "c1",
  tags: ["test"],
  createdAt: new Date().toISOString(),
};

test("renders bookmark title", () => {
  const { getByRole, getByText } = render(
    <DataProvider>
      <BookmarkCard item={item} />
    </DataProvider>
  );
  expect(getByRole("article")).toBeTruthy();
  expect(getByText(/Test Bookmark/i)).toBeTruthy();
});
