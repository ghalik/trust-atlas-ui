import { FilterGroup } from "@/types";
import { Badge } from "@/components/ui/badge";

type FiltersProps = {
  groups: FilterGroup[];
  value: string[];
  onChange: (next: string[]) => void;
};

export function Filters({ groups, value, onChange }: FiltersProps) {
  const toggleGroup = (groupId: string) => {
    if (value.includes(groupId)) {
      onChange(value.filter((id) => id !== groupId));
    } else {
      onChange([...value, groupId]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {groups.map((group) => {
        const isActive = !value.includes(group.id);
        return (
          <Badge
            key={group.id}
            variant={isActive ? "default" : "outline"}
            className="cursor-pointer px-4 py-2 text-sm transition-all hover:scale-105"
            onClick={() => toggleGroup(group.id)}
          >
            {group.label}
          </Badge>
        );
      })}
    </div>
  );
}
