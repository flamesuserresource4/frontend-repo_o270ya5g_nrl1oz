import { Rocket, Star, PlusCircle } from "lucide-react";

export default function Navbar({ onCreate, onToggleFavoritesFilter, favoritesActive, favoritesCount }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60 border-b border-gray-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <a href="#" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
                <Rocket size={18} />
              </div>
              <span className="text-lg font-semibold tracking-tight">CheatCraft</span>
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#popular" className="hover:text-gray-900 transition">Popular</a>
            <a href="#latest" className="hover:text-gray-900 transition">Latest</a>
            <a href="#categories" className="hover:text-gray-900 transition">Categories</a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleFavoritesFilter}
              className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium shadow-sm transition ${
                favoritesActive
                  ? "border-yellow-400 bg-yellow-50 text-yellow-800 hover:bg-yellow-100"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              }`}
              aria-pressed={favoritesActive}
            >
              <Star size={16} />
              Favorites
              <span className="ml-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-black/10 px-1 text-[10px] font-semibold">
                {favoritesCount}
              </span>
            </button>
            <button onClick={onCreate} className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
              <PlusCircle size={16} />
              Create
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
