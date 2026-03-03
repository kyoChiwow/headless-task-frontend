import { useState } from 'react';
import { api } from '@/services/api';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function FeedbackModal({ isOpen, onClose, onSuccess }: FeedbackModalProps) {
  const [name, setName] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const email = localStorage.getItem('userEmail') || undefined;
      await api.createFeedback({ name, feedbackText, email });
      setName('');
      setFeedbackText('');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to create feedback:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-black">Submit Feedback</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-black">Your Name (optional)</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-black">Feedback *</label>
            <textarea
              required
              rows={4}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="w-full p-2 border rounded text-black"
              placeholder="Tell us what you think..."
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100 text-black"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}