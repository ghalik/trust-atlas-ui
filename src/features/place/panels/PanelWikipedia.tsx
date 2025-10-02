import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import { PanelBase } from "./PanelBase";
import { searchWikipedia, WikipediaSummary } from "@/lib/wikipedia";

type PanelWikipediaProps = {
  query: string;
  includedInScore?: boolean;
};

export function PanelWikipedia({ query, includedInScore }: PanelWikipediaProps) {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<WikipediaSummary | null>(null);

  useEffect(() => {
    let mounted = true;

    searchWikipedia(query).then((result) => {
      if (mounted) {
        setSummary(result);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [query]);

  const handleOpenSearch = () => {
    window.open(`https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(query)}`, "_blank");
  };

  return (
    <PanelBase
      title="Wikipedia"
      icon={<BookOpen className="w-6 h-6 text-slate-700" />}
      loading={loading}
      url={summary?.content_urls.desktop.page}
      notFound={!summary}
      onOpenSearch={handleOpenSearch}
      includedInScore={includedInScore}
      gradient="from-slate-500/10 to-slate-400/5"
    >
      {summary && (
        <div className="space-y-2">
          {summary.thumbnail && (
            <img
              src={summary.thumbnail.source}
              alt={summary.title}
              className="w-full h-32 object-cover rounded-lg mb-2"
            />
          )}
          <p className="text-sm text-muted-foreground line-clamp-4">
            {summary.extract}
          </p>
        </div>
      )}
    </PanelBase>
  );
}
