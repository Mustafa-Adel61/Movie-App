import { IGener } from "./igener";

export interface IMovie {
    id: number;
    original_title: string;
    overview: string;
    poster_path: string;
    original_language: string;
    release_date: string;
    vote_average: number;
    runtime?: number;
    genres?: IGener[];
    homepage?: string;
    imdb_id?: string;
    isFavorite?: boolean;
}