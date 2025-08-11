import { Input } from "@/components/ui/input";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { useEffect, useRef, useState } from "react";
import { useData } from "@/context/DataContext";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const { bookmarks, tags, collections } = useData();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
        ref.current?.focus();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = bookmarks.filter((b) =>
    [b.title, b.excerpt, b.url, ...b.tags].join(" ").toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative">
      <Input
        ref={ref}
        value={query}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder="Search bookmarks, tags, collections…"
        aria-label="Search"
      />
      {open && query && (
        <div className="absolute z-50 mt-2 w-full">
          <Command className="rounded-md border bg-popover text-popover-foreground shadow">
            <CommandInput placeholder="Type to search…" value={query} onValueChange={setQuery} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Bookmarks">
                {results.slice(0, 6).map((b) => (
                  <CommandItem key={b.id} value={b.title} onSelect={() => navigate(`/collections/${b.collectionId}?focus=${b.id}`)}>
                    {b.title}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandGroup heading="Tags">
                {tags.slice(0, 6).map((t) => (
                  <CommandItem key={t} value={t} onSelect={() => navigate(`/search?tag=${t}`)}>
                    #{t}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandGroup heading="Collections">
                {collections.slice(0, 6).map((c) => (
                  <CommandItem key={c.id} value={c.title} onSelect={() => navigate(`/collections/${c.id}`)}>
                    {c.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
};
