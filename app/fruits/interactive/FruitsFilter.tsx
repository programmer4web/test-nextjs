'use client';

import { useState } from 'react';

interface Fruit {
  id: string;
  label: string;
  value: string;
  category: string;
}

interface FruitsFilterProps {
  fruits: Fruit[];
}

// Client Component - uses hooks and handles interactivity
export default function FruitsFilter({ fruits }: FruitsFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(fruits.map(f => f.category)))];

  // Filter fruits
  const filteredFruits = fruits.filter(fruit => {
    const matchesCategory = selectedCategory === 'all' || fruit.category === selectedCategory;
    const matchesSearch = fruit.label.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Toggle favorite
  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  return (
    <div className="space-y-6">
      {/* Client-side Controls */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
        <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
          Client-Side Filtering (Interactive)
        </h2>

        {/* Search Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-zinc-900 dark:text-zinc-50">
            Search:
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type to search..."
            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-900 dark:text-zinc-50">
            Filter by Category:
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4">
          Showing {filteredFruits.length} of {fruits.length} items
          {favorites.size > 0 && ` • ${favorites.size} favorited`}
        </p>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredFruits.map(fruit => (
          <div
            key={fruit.id}
            className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow relative"
          >
            <button
              onClick={() => toggleFavorite(fruit.id)}
              className="absolute top-4 right-4 text-2xl hover:scale-110 transition-transform"
              aria-label="Toggle favorite"
            >
              {favorites.has(fruit.id) ? '❤️' : '🤍'}
            </button>

            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2 pr-8">
              {fruit.label}
            </h3>
            <div className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
              <p>
                <span className="font-medium">Category:</span> {fruit.category}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-500">
                ID: {fruit.id}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredFruits.length === 0 && (
        <div className="text-center py-12 text-zinc-500 dark:text-zinc-400">
          No fruits found matching your criteria.
        </div>
      )}
    </div>
  );
}
