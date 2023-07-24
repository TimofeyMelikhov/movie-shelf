import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IMovie, ServerResponse, ServerSearchResponse, ISearchMovie } from '../models/IMovieModels'

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://kinopoiskapiunofficial.tech/api'
  }),
  endpoints: build => ({
    mainMovies: build.query<ServerResponse<IMovie>, string>({
      query: () => ({
        url: `/v2.2/films`,
        headers: {
          'X-API-KEY': '03b257a3-99b3-43ff-be90-2f7b5b72e260',
          'Content-Type': 'application/json',
        },
        params: {
          countries: 1,
          genres: 2,
          order: 'RATING',
          type: 'FILM',
          ratingFrom: 0,
          ratingTo: 10,
          yearFrom: 1000,
          yearTo: 3000,
          page: 1
        }
      })
    }),
    moviesSearch: build.query<ServerSearchResponse<ISearchMovie>, string>({
      query: (debounced: string) => ({
        url: `/v2.1/films/search-by-keyword`,
        headers: {
          'X-API-KEY': '03b257a3-99b3-43ff-be90-2f7b5b72e260',
          'Content-Type': 'application/json',
        },
        params: {
          keyword: debounced,
          page: 1
        }
      })
    })
  })
})

export const { useMainMoviesQuery, useMoviesSearchQuery } = movieApi