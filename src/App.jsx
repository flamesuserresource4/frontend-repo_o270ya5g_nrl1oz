import { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import HeroSearch from "./components/HeroSearch";
import CategoryTabs from "./components/CategoryTabs";
import CheatSheetGrid from "./components/CheatSheetGrid";

const seedData = [
  {
    id: 1,
    title: "Modern JavaScript Essentials",
    author: "Alex Carter",
    description: "Quick reference for ES6+ syntax, array methods, async/await, modules, and patterns.",
    category: "programming",
    tags: ["JavaScript", "ES6", "Async"],
    downloads: 15230,
    favorite: true,
    createdAt: new Date("2024-08-02").getTime(),
  },
  {
    id: 2,
    title: "React Hooks & Patterns",
    author: "Mina Patel",
    description: "Common hooks, performance tips, and composition patterns for modern React apps.",
    category: "programming",
    tags: ["React", "Hooks", "Patterns"],
    downloads: 9840,
    favorite: false,
    createdAt: new Date("2025-01-11").getTime(),
  },
  {
    id: 3,
    title: "Git Everyday Commands",
    author: "Jordan Kim",
    description: "Branching, rebasing, stashing, and collaboration workflows at a glance.",
    category: "tools",
    tags: ["Git", "CLI", "Workflow"],
    downloads: 22110,
    favorite: false,
    createdAt: new Date("2023-12-19").getTime(),
  },
  {
    id: 4,
    title: "Linux Terminal Primer",
    author: "Sam Lee",
    description: "Essential shell commands, file ops, permissions, networking, and package managers.",
    category: "tools",
    tags: ["Linux", "Bash", "Shell"],
    downloads: 7350,
    favorite: true,
    createdAt: new Date("2024-11-05").getTime(),
  },
  {
    id: 5,
    title: "CSS Flexbox & Grid",
    author: "Riley Nguyen",
    description: "Cheat sheet for layout techniques with examples of common patterns.",
    category: "design",
    tags: ["CSS", "Flexbox", "Grid"],
    downloads: 5430,
    favorite: false,
    createdAt: new Date("2024-05-21").getTime(),
  },
  {
    id: 6,
    title: "SQL Quick Reference",
    author: "Priya Shah",
    description: "SELECT patterns, joins, window functions, and performance tips for relational DBs.",
    category: "data",
    tags: ["SQL", "Joins", "Windows"],
    downloads: 18760,
    favorite: false,
    createdAt: new Date("2024-09-14").getTime(),
  },
];

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [items, setItems] = useState(seedData);
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const popular = useMemo(() => items.filter((i) => i.downloads > 8000), [items]);
  const favoritesCount = useMemo(() => items.filter((i) => i.favorite).length, [items]);

  const handleToggleFav = (id) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, favorite: !i.favorite } : i)));
  };

  const handleCreate = () => {
    const title = prompt("Title of your cheat sheet");
    if (!title) return;
    const newItem = {
      id: Date.now(),
      title,
      author: "You",
      description: "A freshly created cheat sheet.",
      category: "programming",
      tags: ["Custom"],
      downloads: 0,
      favorite: false,
      createdAt: Date.now(),
    };
    setItems((prev) => [newItem, ...prev]);
  };

  const handleDownload = (item) => {
    // Increment download count locally
    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, downloads: i.downloads + 1 } : i)));
    // Generate a simple text file to download
    const content = `Title: ${item.title}\nAuthor: ${item.author}\nCategory: ${item.category}\nTags: ${item.tags.join(", ")}\n\nDescription:\n${item.description}\n`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${item.title.replace(/[^a-z0-9\- ]/gi, "_").replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleToggleFavoritesFilter = () => setFavoritesOnly((v) => !v);

  // Apply favoritesOnly to the full browse list (second section)
  const browseItems = useMemo(() => {
    return favoritesOnly ? items.filter((i) => i.favorite) : items;
  }, [items, favoritesOnly]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar
        onCreate={handleCreate}
        onToggleFavoritesFilter={handleToggleFavoritesFilter}
        favoritesActive={favoritesOnly}
        favoritesCount={favoritesCount}
      />

      <HeroSearch query={query} setQuery={setQuery} />
      <CategoryTabs active={category} onChange={setCategory} />

      <CheatSheetGrid
        sectionId="popular"
        items={popular}
        query={query}
        category={category}
        onToggleFav={handleToggleFav}
        onDownload={handleDownload}
        onlyPopular
      />

      <CheatSheetGrid
        sectionId="latest"
        items={browseItems}
        query={query}
        category={category}
        onToggleFav={handleToggleFav}
        onDownload={handleDownload}
      />

      <footer className="mt-16 border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            Built with React + Tailwind. Inspired by the spirit of community-made cheat sheets.
          </p>
          <p className="text-gray-500">© {new Date().getFullYear()} CheatCraft</p>
        </div>
      </footer>
    </div>
  );
}
