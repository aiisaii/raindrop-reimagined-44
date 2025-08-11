import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useData } from "@/context/DataContext";
import { Toolbar } from "@/components/common/Toolbar";
import { BookmarkCard } from "@/components/cards/BookmarkCard";

const CollectionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { collections, bookmarks } = useData();
  const [view, setView] = useState<"grid" | "list">("grid");

  const collection = collections.find((c) => c.id === id);
  const items = useMemo(() => bookmarks.filter((b) => b.collectionId === id), [bookmarks, id]);

  if (!collection) return <div className="py-20 text-center text-muted-foreground">Collection not found.</div>;

  return (
    <main>
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">{collection.title}</h1>
        <p className="text-sm text-muted-foreground">{items.length} items</p>
      </header>

      <Toolbar view={view} onViewChange={setView} />

      {items.length === 0 ? (
        <div className="mt-8 rounded-lg border p-10 text-center text-muted-foreground">Empty collection — add your first bookmark.</div>
      ) : (
        <section className="mt-4">
          {view === "grid" ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((b) => (
                <BookmarkCard key={b.id} item={b} />
              ))}
            </div>
          ) : (
            <div className="grid gap-2">
              {items.map((b) => (
                <BookmarkCard key={b.id} item={b} variant="list" />
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
};

export default CollectionDetail;
