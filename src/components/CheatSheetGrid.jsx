import { Star, Download, Code, Terminal, Palette, Database, Globe, Book, Filter } from "lucide-react";
import { useMemo, useState } from "react";

const iconMap = {
  programming: Code,
  tools: Terminal,
  design: Palette,
  data: Database,
  web: Globe,
  default: Book,
};

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
      {children}
    </span>
  );
}

function Card({ item, onToggleFav, onDownload }) {
  const Icon = iconMap[item.category] || iconMap.default;
  return (
    <div className="group relative flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
            <Icon size={18} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.author}</p>
          </div>
        </div>
        <button
          onClick={() => onToggleFav(item.id)}
          className={`rounded-full p-2 transition ${
            item.favorite ? "text-yellow-500" : "text-gray-400 hover:text-gray-600"
          }`}
          aria-label="Toggle favorite"
        >
          <Star size={18} fill={item.favorite ? "currentColor" : "none"} />
        </button>
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-gray-600">{item.description}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {item.tags.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-xs text-gray-500">{item.downloads.toLocaleString()} downloads</div>
        <button
          onClick={() => onDownload(item)}
          className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
        >
          <Download size={16} />
          Download
        </button>
      </div>
    </div>
  );
}

export default function CheatSheetGrid({ sectionId, items, query, category, onToggleFav, onDownload, onlyPopular }) {
  const [sort, setSort] = useState("popular");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = items.filter((i) => {
      const inCat = category === "all" || i.category === category;
      const matches =
        !q ||
        i.title.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.tags.some((t) => t.toLowerCase().includes(q));
      return inCat && matches && (!onlyPopular || i.downloads > 5000);
    });

    if (sort === "popular") list.sort((a, b) => b.downloads - a.downloads);
    if (sort === "new") list.sort((a, b) => b.createdAt - a.createdAt);
    if (sort === "name") list.sort((a, b) => a.title.localeCompare(b.title));

    return list;
  }, [items, query, category, sort, onlyPopular]);

  return (
    <section id={sectionId} className="mx-auto max-w-6xl px-4 sm:px-6 mt-10">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-gray-900">{onlyPopular ? "Popular" : "Browse"} cheat sheets</h2>
        <div className="flex items-center gap-2 text-sm">
          <label className="text-gray-600">Sort by</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
          >
            <option value="popular">Most popular</option>
            <option value="new">Newest</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <Card key={item.id} item={item} onToggleFav={onToggleFav} onDownload={onDownload} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-500">
            No results. Try a different search or category.
          </div>
        )}
      </div>
    </section>
  );
}
