export interface Feedback {
    name: string;
    feedbackText: string;
    category: string;
    priority: string;
    sentiment: string;
    team: string;
}

export type CreateFeedbackDTO = {
    name: string;
    feedbackText: string;
    email?: string;
}