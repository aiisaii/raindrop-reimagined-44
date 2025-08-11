import { Bookmark, useData } from "@/context/DataContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, ExternalLink } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMemo, useState } from "react";
import { BookmarkModal } from "@/components/modals/BookmarkModal";

export type BookmarkCardProps = {
  item: Bookmark;
  variant?: "grid" | "list";
};

export const BookmarkCard = ({ item, variant = "grid" }: BookmarkCardProps) => {
  const { deleteBookmark } = useData();
  const [open, setOpen] = useState(false);
  const domain = useMemo(() => {
    try {
      return new URL(item.url).host.replace("www.", "");
    } catch {
      return item.url;
    }
  }, [item.url]);

  const media = (
    <img
      src={item.image}
      loading="lazy"
      alt={`${item.title} preview`}
      className="h-36 w-full rounded-md object-cover"
    />
  );

  const title = (
    <h3 className="line-clamp-2 text-sm font-medium leading-snug">{item.title}</h3>
  );

  const meta = (
    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
      <span className="truncate">{domain}</span>
    </div>
  );

  const tags = (
    <div className="mt-2 flex flex-wrap gap-1">
      {item.tags.slice(0, 3).map((t) => (
        <Badge key={t} variant="outline">{t}</Badge>
      ))}
    </div>
  );

  const menu = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open actions">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <a href={item.url} target="_blank" rel="noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" /> Open
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setOpen(true)}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={() => deleteBookmark(item.id)} className="text-destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  if (variant === "list") {
    return (
      <Card role="article" className="group hover:shadow-elegant transition-shadow">
        <CardContent className="flex items-center gap-4 p-3">
          <img src={item.image} alt="" className="h-16 w-28 rounded object-cover" loading="lazy" />
          <div className="min-w-0 flex-1">
            {title}
            {meta}
            {tags}
          </div>
          {menu}
        </CardContent>
        <BookmarkModal open={open} onOpenChange={setOpen} item={item} />
      </Card>
    );
  }

  return (
    <Card role="article" className="group hover:shadow-elegant transition-shadow">
      <CardContent className="p-3">
        <button className="w-full text-left" onClick={() => setOpen(true)} aria-label={`Open ${item.title}`}>
          {media}
          <div className="mt-3">
            {title}
            {meta}
            {tags}
          </div>
        </button>
        <div className="mt-2 flex justify-end">{menu}</div>
      </CardContent>
      <BookmarkModal open={open} onOpenChange={setOpen} item={item} />
    </Card>
  );
};
