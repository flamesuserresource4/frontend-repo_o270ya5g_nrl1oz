import { Rocket, Star, PlusCircle } from "lucide-react";

export default function Navbar({ onCreate }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60 border-b border-gray-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
              <Rocket size={18} />
            </div>
            <span className="text-lg font-semibold tracking-tight">CheatCraft</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#popular" className="hover:text-gray-900 transition">Popular</a>
            <a href="#latest" className="hover:text-gray-900 transition">Latest</a>
            <a href="#categories" className="hover:text-gray-900 transition">Categories</a>
          </nav>

          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
              <Star size={16} />
              Favorites
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
