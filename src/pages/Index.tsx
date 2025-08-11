import { useData } from "@/context/DataContext";
import { CollectionCard } from "@/components/cards/CollectionCard";
import { BookmarkCard } from "@/components/cards/BookmarkCard";

const Index = () => {
  const { collections, bookmarks } = useData();
  const recent = [...bookmarks].sort((a,b) => a.createdAt < b.createdAt ? 1 : -1).slice(0, 6);

  return (
    <main>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Raindrop.io Clone – Bookmarks Manager</h1>
        <p className="text-sm text-muted-foreground">Pinned collections and your most recent bookmarks.</p>
      </header>

      <section aria-labelledby="pinned" className="mb-8">
        <h2 id="pinned" className="mb-3 text-sm font-medium text-muted-foreground">Pinned collections</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {collections.slice(0,4).map((c) => (
            <CollectionCard key={c.id} item={c} />
          ))}
        </div>
      </section>

      <section aria-labelledby="recent">
        <h2 id="recent" className="mb-3 text-sm font-medium text-muted-foreground">Recent bookmarks</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recent.map((b) => (
            <BookmarkCard key={b.id} item={b} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Index;
