import { useData } from "@/context/DataContext";
import { BookmarkCard } from "@/components/cards/BookmarkCard";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";

const SearchPage = () => {
  const { bookmarks, tags } = useData();
  const [q, setQ] = useState("");

  const results = useMemo(() =>
    bookmarks.filter((b) => [b.title, b.excerpt, b.url, ...b.tags].join(" ").toLowerCase().includes(q.toLowerCase())),
  [bookmarks, q]);

  return (
    <main>
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">Search</h1>
      </header>
      <div className="mb-6">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" aria-label="Search" />
      </div>
      {q && (
        <p className="mb-3 text-sm text-muted-foreground">{results.length} results</p>
      )}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {results.map((b) => (
          <BookmarkCard key={b.id} item={b} />
        ))}
      </section>
    </main>
  );
};

export default SearchPage;
