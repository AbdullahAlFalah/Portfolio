import { getApiBase } from "../utils/getAPIBaseURL";

export interface CommentItem {
    _id: string;
    name: string;
    email?: string;
    text: string;
    movie_id: string;
    date?: string;
    [key: string]: any;
}

export interface GetCommentsResponse {
    comments: CommentItem[];
}

export async function getComments(baseUrl?: string): Promise<GetCommentsResponse> {
    const apiBase = baseUrl ?? getApiBase();
    const res = await fetch(`${apiBase}/api/getCommentsData`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        credentials: 'include'
    });

    if (!res.ok) {
        const errText = await res.text().catch(() => res.statusText);
        throw new Error(errText || `getComments failed: ${res.status}`);
    }

    const body = await res.json() as GetCommentsResponse;
    return body;
}
