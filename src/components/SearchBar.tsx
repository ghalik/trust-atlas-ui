import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type SearchBarProps = {
  initialValue?: string;
  onSearch: (query: string) => void;
};

export function SearchBar({ initialValue = "", onSearch }: SearchBarProps) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search a place (e.g., 'Nobu' or 'Schwartz')"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="pl-12 h-14 text-lg glass-card"
          />
        </div>
        <Button type="submit" size="lg" className="h-14 px-8">
          Search
        </Button>
      </div>
    </form>
  );
}
