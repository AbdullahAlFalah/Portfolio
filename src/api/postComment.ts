import { getApiBase } from "../utils/getAPIBaseURL";

export interface CommentInput {
    name: string;
    email: string;
    text: string;
    movie_id: string;
}

export interface AddCommentResponse {
    message: string;
    inserted_id: string;
}

// Basic validation helpers
function isNonEmptyString(v: any): v is string {
    return typeof v === 'string' && v.trim().length > 0;
}
function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isLikelyObjectId(id: string): boolean {
    return /^[a-fA-F0-9]{24}$/.test(id);
}

export function validateCommentInput(input: Partial<CommentInput>): asserts input is CommentInput {
    if (!isNonEmptyString(input.name)) throw new Error('Name is required');
    if (!isNonEmptyString(input.email) || !isValidEmail(input.email)) throw new Error('Valid email is required');
    if (!isNonEmptyString(input.text)) throw new Error('Comment text is required');
    if (!isNonEmptyString(input.movie_id) || !isLikelyObjectId(input.movie_id)) throw new Error('movie_id must be a 24-char hex string');
}

export async function postComment(input: Partial<CommentInput>, baseUrl?: string): Promise<AddCommentResponse> {
    validateCommentInput(input);
    const apiBase = baseUrl ?? getApiBase();

    const res = await fetch(`${apiBase}/api/addComment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(input)
    });

    const text = await res.text().catch(() => '');
    let body: any = null;
    try { body = text ? JSON.parse(text) : null; } catch { body = text; }

    if (!res.ok) {
        const message = body && body.error ? body.error : (typeof body === 'string' && body) || `postComment failed: ${res.status}`;
        throw new Error(message);
    }

    return body as AddCommentResponse;
}
