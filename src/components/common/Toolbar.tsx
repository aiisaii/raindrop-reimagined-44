import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Grid3X3, ListFilter, Rows } from "lucide-react";
import { useEffect } from "react";

export type ToolbarProps = {
  view: "grid" | "list";
  onViewChange: (v: "grid" | "list") => void;
};

export const Toolbar = ({ view, onViewChange }: ToolbarProps) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "g") onViewChange("grid");
      if (e.key.toLowerCase() === "l") onViewChange("list");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onViewChange]);

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Button variant="secondary" size="sm">
          <ListFilter className="mr-2 h-4 w-4" /> Filters
        </Button>
      </div>
      <ToggleGroup type="single" value={view} onValueChange={(v) => v && onViewChange(v as any)}>
        <ToggleGroupItem value="grid" aria-label="Grid view">
          <Grid3X3 className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="list" aria-label="List view">
          <Rows className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
