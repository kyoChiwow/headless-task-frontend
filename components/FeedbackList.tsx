import { Feedback } from '@/types/feedback';

interface FeedbackListProps {
  feedbacks: Feedback[];
}

export default function FeedbackList({ feedbacks }: FeedbackListProps) {
  if (feedbacks.length === 0) {
    return <p className="text-gray-500">No feedbacks yet.</p>;
  }

  return (
    <div className="space-y-4">
      {feedbacks.map((fb) => (
        <div key={fb._id} className="border p-4 rounded shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-black">{fb.name || 'Anonymous'}</h3>
              <p className="text-gray-700 mt-1">{fb.feedbackText}</p>
            </div>
            <div className="text-sm space-x-2">
              <span className={`px-2 py-1 rounded ${
                fb.priority === 'High' ? 'bg-red-100 text-red-800' :
                fb.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {fb.priority}
              </span>
              <span className="px-2 py-1 rounded bg-blue-100 text-blue-800">
                {fb.category}
              </span>
              <span className="px-2 py-1 rounded bg-purple-100 text-purple-800">
                {fb.team}
              </span>
              <span className="px-2 py-1 rounded bg-gray-100 text-gray-800">
                {fb.sentiment}
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {new Date(fb.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}