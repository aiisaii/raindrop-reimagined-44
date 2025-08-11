import { Collection } from "@/context/DataContext";
import { Card, CardContent } from "@/components/ui/card";

export const CollectionCard = ({ item }: { item: Collection }) => {
  return (
    <Card className="hover:shadow-elegant transition-shadow">
      <CardContent className="p-0">
        <img src={item.cover} alt={`${item.title} cover`} className="h-28 w-full rounded-t-md object-cover" loading="lazy" />
        <div className="p-3">
          <h3 className="truncate text-sm font-medium">{item.title}</h3>
          {typeof item.counts === "number" && (
            <p className="mt-1 text-xs text-muted-foreground">{item.counts} items</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
