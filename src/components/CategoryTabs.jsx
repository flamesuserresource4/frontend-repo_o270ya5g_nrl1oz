const categories = [
  { key: "all", label: "All" },
  { key: "programming", label: "Programming" },
  { key: "tools", label: "Tools" },
  { key: "design", label: "Design" },
  { key: "data", label: "Data" },
];

export default function CategoryTabs({ active, onChange }) {
  return (
    <div id="categories" className="mx-auto max-w-6xl px-4 sm:px-6 mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Browse by category</h2>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => onChange(c.key)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              active === c.key
                ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
