import { Metadata } from 'next';
import fruitsData from '@/data/fruits.json';
import FruitsFilter from './FruitsFilter';

export const metadata: Metadata = {
  title: 'Interactive Fruits - Server + Client Demo',
  description: 'Demonstrates Server Component fetching data and Client Component handling interactivity',
};

// Server Component - fetches data
async function getFruits() {
  // Simulate database query
  await new Promise(resolve => setTimeout(resolve, 300));
  return fruitsData;
}

// Server Component (async, no hooks, no interactivity)
export default async function InteractiveFruitsPage() {
  // Data fetching happens on the server
  const fruits = await getFruits();

  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
          Interactive Fruits Catalog
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-4">
          This page demonstrates <strong>Server + Client Component composition</strong>
        </p>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
              🖥️ Server Component (This Page)
            </h3>
            <ul className="text-green-800 dark:text-green-200 space-y-1 list-disc list-inside">
              <li>Fetches data from source</li>
              <li>Runs on server only</li>
              <li>No JavaScript to client</li>
              <li>Passes data to Client Component</li>
            </ul>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              ⚛️ Client Component (Filter Below)
            </h3>
            <ul className="text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
              <li>Receives data as props</li>
              <li>Handles user interactions</li>
              <li>Uses useState, useEffect, etc.</li>
              <li>Runs in browser</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Client Component - handles interactivity */}
      <FruitsFilter fruits={fruits} />

      <div className="mt-8 p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-zinc-900 dark:text-zinc-50">
          💡 How This Works:
        </h3>
        <ol className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300 list-decimal list-inside">
          <li>
            <strong>Server Component</strong> fetches data on the server (no API route needed)
          </li>
          <li>
            <strong>Data is passed as props</strong> to the Client Component
          </li>
          <li>
            <strong>Client Component</strong> uses useState to handle filtering/favoriting
          </li>
          <li>
            <strong>Best of both worlds:</strong> Fast server rendering + interactive UI
          </li>
        </ol>
      </div>
    </div>
  );
}
