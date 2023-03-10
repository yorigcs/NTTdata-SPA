export interface MoviesSearchData {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface MoviesSearchResponse {
  Search: Movie[];
  totalResult: number;
  pages: number;
}
