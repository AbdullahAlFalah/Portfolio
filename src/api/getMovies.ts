import { getApiBase } from "../utils/getAPIBaseURL";

export interface Awards {
  wins?: number;
  nominations?: number;
  text?: string;
  [k: string]: any;
}

export interface Imdb {
  id?: number;
  rating?: number;
  votes?: number;
  [k: string]: any;
}

export interface TomatoesViewer {
  rating?: number;
  numReviews?: number;
  meter?: number;
  [k: string]: any;
}

export interface TomatoesCritic {
  rating?: number;
  numReviews?: number;
  meter?: number;
  [k: string]: any;
}

export interface Tomatoes {
    viewer?: TomatoesViewer;
    fresh?: number;
    critic?: TomatoesCritic;
    rotten?: number;
    [k: string]: any;
}

export interface Movie {
    _id: string;
    title?: string;
    plot?: string;
    genres?: string[];
    runtime?: number;
    cast?: string[];
    num_mflix_comments?: number;
    poster?: string;
    countries?: string[];
    released?: string; // ISO string from DB; I must parse it to Date in UI.
    directors?: string[];
    writers?: string[];
    awards?: Awards;
    lastupdated?: string;
    year?: number;
    imdb?: Imdb;
    type?: string;
    tomatoes?: Tomatoes;
    [key: string]: any; // Allow any other fields that might exist
}

export interface GetMoviesResponse {
    movies: Movie[];
}

export async function getMovies(baseUrl?: string): Promise<GetMoviesResponse> {
    const apiBase = baseUrl ?? getApiBase();
    console.log("🔹 Using API Base:", apiBase);
    const res = await fetch(`${apiBase}/api/getMoviesData`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        credentials: 'include'
    });

    if (!res.ok) {
        const errText = await res.text().catch(() => res.statusText);
        throw new Error(errText || `getMovies failed: ${res.status}`);
    }

    const body = await res.json() as GetMoviesResponse;
    return body;
}
