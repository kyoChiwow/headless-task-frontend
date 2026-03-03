import { CreateFeedbackDTO, Feedback } from "@/types/feedback";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

// Generic Fetcher
export const fetcher = async (url: string) => {
    const res= await fetch(url);

    if(!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
    }

    return res.json();
}


export const api = {
    // Get all the feedbacks with search params
    getFeedbacks: async (params?: Record<string, string>) => {
        const url = new URL(`${API_BASE}/feedback/get-feedback`);

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value) url.searchParams.append(key, value);
            })
        }

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error('Failed to fetch feedbacks');
        return res.json() as Promise<Feedback[]>
    },

    // Create a new feedback api here
    createFeedback: async (data: CreateFeedbackDTO) => {
        const res= await fetch(`${API_BASE}/feedback/create-feedback`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        if (!res.ok) throw new Error('Failed to create a feedback');
        return res.json() as Promise<Feedback>;
    },
};