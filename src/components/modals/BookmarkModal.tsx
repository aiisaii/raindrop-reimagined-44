import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Bookmark, useData } from "@/context/DataContext";
import { useState } from "react";

export const BookmarkModal = ({ open, onOpenChange, item }: { open: boolean; onOpenChange: (o: boolean) => void; item: Bookmark; }) => {
  const { updateBookmark } = useData();
  const [title, setTitle] = useState(item.title);
  const [excerpt, setExcerpt] = useState(item.excerpt || "");
  const [tags, setTags] = useState(item.tags.join(", "));

  const onSave = async () => {
    await updateBookmark({ ...item, title, excerpt, tags: tags.split(",").map((t) => t.trim()).filter(Boolean) });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="bookmark-edit-desc">
        <DialogHeader>
          <DialogTitle>Edit bookmark</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3">
          <label className="grid gap-1">
            <span className="text-sm">Title</span>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label className="grid gap-1">
            <span className="text-sm">Notes</span>
            <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={4} />
          </label>
          <label className="grid gap-1">
            <span className="text-sm">Tags</span>
            <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="comma,separated" />
          </label>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
