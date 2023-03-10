import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchMoviesListPreview } from '../../external/requests';
import { RootState } from '../store';

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface MoviesPreview{
  Search: Movie[];
  totalResult: number;
  pages: number;
}

export interface MoviesPreviewState {
  movies: null | MoviesPreview;
  status: 'idle' | 'loading' | 'failed';
  error: string
}

const initialState: MoviesPreviewState = {
  movies: null ,
  status: 'idle',
  error: ''
};

export const getListMoviesPreview = createAsyncThunk(
  'moviePreview/getListMoviesPreview',
  async ({name, page}: {name: string, page: number}, {rejectWithValue}) => {
    try {
      const response = await fetchMoviesListPreview(name,page);
      return response.data as MoviesPreview
    } catch (error: any) {
      return rejectWithValue(error.response.data.error)
    }
    
  }
);

export const moviePreviewSlice = createSlice({
  name: 'moviePreview',
  initialState,
  reducers: {
    clearMovies: (state) => {
      state.movies = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListMoviesPreview.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getListMoviesPreview.fulfilled, (state, action) => {
        state.status = 'idle';
        state.movies = action.payload;
      })
      .addCase(getListMoviesPreview.rejected, (state,action) => {
        state.status = 'failed';
        state.error = action.payload as string
      });
  },
  
});

export const { clearMovies } = moviePreviewSlice.actions;
export const selectMoviesPreview = (state: RootState) => state.moviesPreview;
export default moviePreviewSlice.reducer;
