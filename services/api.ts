import { Feedback, CreateFeedbackDTO } from '@/types/feedback';

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// Generic fetcher for SWR
export const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};

export const api = {
  // Get all feedbacks with search params
  getFeedbacks: async (params?: Record<string, string>) => {
    const url = new URL(`${API_BASE}/feedback/get-feedback`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) url.searchParams.append(key, value);
      });
    }
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error('Failed to fetch feedbacks');
    const json = await res.json();
    return json.data as Feedback[];
  },

  // Create new feedback
  createFeedback: async (data: CreateFeedbackDTO) => {
    const payload = {
      name: data.name,
      message: data.feedbackText,
      email: data.email,
    };
    const res = await fetch(`${API_BASE}/feedback/create-feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create feedback');
    const json = await res.json();
    return json.data as Feedback;
  },
};