"use client";

import React, { useState } from "react";
import { AutocompletePro, AutocompleteOption } from "react-autocomplete-pro";

const sampleData = [
  { id: "1", label: "Apple", value: "apple", category: "Fruits" },
  { id: "2", label: "Banana", value: "banana", category: "Fruits" },
  { id: "3", label: "Cherry", value: "cherry", category: "Fruits" },
  { id: "4", label: "Carrot", value: "carrot", category: "Vegetables" },
  { id: "5", label: "Broccoli", value: "broccoli", category: "Vegetables" },
  { id: "6", label: "Cucumber", value: "cucumber", category: "Vegetables" },
  { id: "7", label: "Avocado", value: "avocado", category: "Fruits" },
  { id: "8", label: "Asparagus", value: "asparagus", category: "Vegetables" },
];

export default function DemoReactAutocompletePro() {
  const [selectedItem, setSelectedItem] = useState<AutocompleteOption | null>(null);

  const handleSearch = async (query: string): Promise<AutocompleteOption[]> => {
    try {
      const response = await fetch(`/api/fruits?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Search error:', error);
      return sampleData; // Fallback to static data on error
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
          React Autocomplete Pro Demo
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
          A demonstration of the react-autocomplete-pro component with sample fruit and vegetable data.
        </p>
      </div>

      <div className="space-y-8">
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <label className="block text-sm font-medium mb-2 text-zinc-900 dark:text-zinc-50">
            Search for fruits or vegetables:
          </label>
          <div id="autocomplete-wrapper">
            <AutocompletePro
              options={[]}
              value={selectedItem || undefined}
              onChange={(selected) => {
                setSelectedItem(Array.isArray(selected) ? selected[0] : selected);
              }}
              onSearch={handleSearch}
              placeholder="Type to search..."
              renderOption={(option) => (
                <div className="flex justify-between items-center" style={{ paddingLeft: '12px', paddingRight: '12px' }}>
                  <span style={{ color: '#000000' }}>{option.label}</span>
                  <span className="text-xs" style={{ color: '#71717a' }}>
                    {option.category}
                  </span>
                </div>
              )}
              showCategories={true}
            />
          </div>
        </div>

        {selectedItem && (
          <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-zinc-50">
              Selected Item:
            </h3>
            <div className="space-y-1 text-zinc-600 dark:text-zinc-400">
              <p>
                <strong>Name:</strong> {selectedItem.label}
              </p>
              <p>
                <strong>Category:</strong> {selectedItem.category}
              </p>
              <p>
                <strong>ID:</strong> {selectedItem.id}
              </p>
            </div>
          </div>
        )}

        <div className="text-sm text-zinc-500 dark:text-zinc-400">
          <p>
            This demo showcases the basic usage of react-autocomplete-pro with custom rendering and data handling.
          </p>
        </div>
      </div>
    </div>
  );
}
