export interface MoviesData {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface MoviesResponse {
  Search: Movie[];
  totalResult: number;
  pages: number;
}
