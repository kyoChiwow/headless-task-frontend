export interface Feedback {
    _id: string;
    name: string;
    feedbackText: string;
    category: string;
    priority: string;
    sentiment: string;
    team: string;
    createdAt: string;
    updatedAt: string;
}

export type CreateFeedbackDTO = {
    name: string;
    feedbackText: string;
    email?: string;
}