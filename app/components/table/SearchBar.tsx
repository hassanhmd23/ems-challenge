import { useState } from "react";

type SearchBarProps = {
  initialQuery?: string;
  onSearch: (query: string) => void;
};

export default function SearchBar({ initialQuery = "", onSearch }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="mb-4 flex items-center gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search employees..."
        className="border border-gray-300 rounded px-3 py-2 w-full"
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        Search
      </button>
    </form>
  );
}