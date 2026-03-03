"use client"

import { useState } from 'react';
import useSWR from 'swr';
import { api } from '@/services/api';
import { Feedback } from '@/types/feedback';
import SearchBar from '@/components/SearchBar';
import FeedbackList from '@/components/FeedbackList';
import FeedbackModal from '@/components/FeedbackModal';
import EmailPrompt from '@/components/EmailPrompt';

type SearchParams = {
  name?: string;
  category?: string;
  priority?: string;
};

export default function Home() {
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  const [modalOpen, setModalOpen] = useState(false);

  const { data: feedbacks, error, isLoading, mutate } = useSWR<Feedback[]>(
    ['/feedback/get-feedback', searchParams],
    async ([, params]) => {
      return api.getFeedbacks(params as SearchParams);
    }
  );

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
  };

  const handleCreateSuccess = async () => {
    mutate();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <EmailPrompt />
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-black">Feedback Intelligence</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + New Feedback
          </button>
        </div>

        <SearchBar onSearch={handleSearch} />

        {isLoading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">Failed to load feedbacks.</p>}
        {feedbacks && <FeedbackList feedbacks={feedbacks} />}

        <FeedbackModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSuccess={handleCreateSuccess}
        />
      </div>
    </div>
  );
}