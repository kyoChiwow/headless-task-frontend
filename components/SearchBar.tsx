// src/components/SearchBar.tsx
import { useState } from 'react';

type SearchParams = {
  name?: string;
  category?: string;
  priority?: string;
};

interface SearchBarProps {
  onSearch: (params: SearchParams) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ name, category, priority });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-4">
      <input
        type="text"
        placeholder="Search by name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded flex-1 text-black"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All Categories</option>
        <option value="Product">Product</option>
        <option value="Service">Service</option>
        <option value="Billing">Billing</option>
        <option value="Feature Request">Feature Request</option>
        <option value="Bug">Bug</option>
      </select>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All Priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Search
      </button>
    </form>
  );
}