import { Metadata } from 'next';
import Link from 'next/link';
import fruitsData from '@/data/fruits.json';

// Metadata for SEO (only works in Server Components)
export const metadata: Metadata = {
  title: 'Fruits & Vegetables Catalog',
  description: 'Browse our complete catalog of fresh fruits and vegetables',
};

// Helper function to simulate data fetching
async function getFruits() {
  // In a real app, this could be a database query
  // For now, we'll simulate a delay and return the JSON data
  await new Promise(resolve => setTimeout(resolve, 500));
  return fruitsData;
}

// Server Component (async is only possible in Server Components!)
export default async function FruitsPage() {
  const fruits = await getFruits();

  // Group by category
  const categories = fruits.reduce((acc, fruit) => {
    if (!acc[fruit.category]) {
      acc[fruit.category] = [];
    }
    acc[fruit.category].push(fruit);
    return acc;
  }, {} as Record<string, typeof fruits>);

  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
          Fruits & Vegetables Catalog
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          This is a <strong>Server Component</strong> - data is fetched on the server and rendered to HTML before being sent to the browser.
        </p>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            <strong>💡 Server Component Benefits:</strong>
          </p>
          <ul className="text-sm text-blue-800 dark:text-blue-200 mt-2 space-y-1 list-disc list-inside">
            <li>No JavaScript sent to the client for this component</li>
            <li>Direct access to backend resources (files, databases)</li>
            <li>Better SEO - content is in initial HTML</li>
            <li>Faster initial page load</li>
            <li>Can use async/await directly in the component</li>
          </ul>
        </div>
      </div>

      <div className="space-y-8">
        {Object.entries(categories).map(([category, items]) => (
          <div key={category}>
            <h2 className="text-2xl font-semibold mb-4 text-zinc-800 dark:text-zinc-200 border-b border-zinc-300 dark:border-zinc-700 pb-2">
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((fruit) => (
                <Link href={`/fruits/${fruit.id}`} key={fruit.id}>
                <div
                  className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                    {fruit.label}
                  </h3>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                    <p>
                      <span className="font-medium">Category:</span> {fruit.category}
                    </p>
                    <p>
                      <span className="font-medium">Value:</span> {fruit.value}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500">
                      ID: {fruit.id}
                    </p>
                  </div>
                </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-zinc-900 dark:text-zinc-50">
          📝 Key Differences: Server vs Client Components
        </h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">
              ✅ Server Components (This Page)
            </h4>
            <ul className="space-y-1 text-zinc-700 dark:text-zinc-300 list-disc list-inside">
              <li>Can be async functions</li>
              <li>Access backend directly</li>
              <li>No useState, useEffect, etc.</li>
              <li>No event handlers (onClick, etc.)</li>
              <li>Rendered on server only</li>
              <li>Default in App Router</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
              ⚛️ Client Components (Autocomplete Demo)
            </h4>
            <ul className="space-y-1 text-zinc-700 dark:text-zinc-300 list-disc list-inside">
              <li>Need "use client" directive</li>
              <li>Can use hooks (useState, etc.)</li>
              <li>Can handle user interactions</li>
              <li>Rendered on client</li>
              <li>JavaScript sent to browser</li>
              <li>Use for interactivity</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
