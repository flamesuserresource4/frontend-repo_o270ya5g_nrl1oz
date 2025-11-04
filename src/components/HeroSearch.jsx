import { Search } from "lucide-react";

export default function HeroSearch({ query, setQuery }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-violet-50">
      <div className="absolute inset-0 opacity-40 pointer-events-none" aria-hidden>
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-indigo-200 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-violet-200 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900">Find or make the perfect cheat sheet</h1>
          <p className="mt-4 text-lg text-gray-600">Explore concise, shareable reference sheets for coding, design, CLI tools and more.</p>

          <div className="mt-8">
            <label htmlFor="search" className="sr-only">Search</label>
            <div className="relative mx-auto max-w-xl">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search topics, languages, frameworks..."
                className="block w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-base placeholder:text-gray-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
              />
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-500">
            Popular: <span className="inline-flex gap-2">{["JavaScript","Git","React","Linux"].map(tag => (
              <span key={tag} className="cursor-pointer rounded-full border border-gray-200 bg-white px-3 py-1 hover:bg-gray-50" onClick={() => setQuery(tag)}>
                {tag}
              </span>
            ))}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
