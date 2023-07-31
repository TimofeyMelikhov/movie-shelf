import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { 
  IMovie, 
  ServerMoviesResponse, 
  ServerSearchResponse, 
  ISearchMovie, 
  IMovieDetail,
  IStaff,
  ServerResponse,
  IBudget,
  IDistribution,
  IRelatedFilms,
  IFacts,
  IPersonDetail
} from '../models/IMovieModels'

const headers = {
  'X-API-KEY': '03b257a3-99b3-43ff-be90-2f7b5b72e260',
  'Content-Type': 'application/json',
}

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://kinopoiskapiunofficial.tech/api'
  }),
  endpoints: build => ({
    mainMovies: build.query<ServerMoviesResponse<IMovie>, string>({
      query: () => ({
        url: `/v2.2/films`,
        headers,
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
        headers,
        params: {
          keyword: debounced,
          page: 1
        }
      })
    }),
    getMovieDetails: build.query<IMovieDetail, string | undefined>({
      query: (id: string) => ({
        url: `v2.2/films/${id}`,
        headers
      })
    }),

    getStaffMovie: build.query<IStaff[], string | undefined>({
      query: (id: string) => ({
        url: `v1/staff`,
        headers,
        params: {
          filmId: id
        }
      })
    }),
    getBudgetMovie: build.query<ServerResponse<IBudget>, string | undefined>({
      query: (id: string) => ({
        url: `/v2.2/films/${id}/box_office`,
        headers
      })
    }),
    getDistributionMovie: build.query<ServerResponse<IDistribution>, string | undefined>({
      query: (id: string) => ({
        url: `/v2.2/films/${id}/distributions`,
        headers
      })
    }),
    getPrequelMovies: build.query<IRelatedFilms[], string | undefined>({
      query: (id: string) => ({
        url: `v2.1/films/${id}/sequels_and_prequels`,
        headers
      })
    }),
    getFactsMovie: build.query<ServerResponse<IFacts>, string | undefined>({
      query: (id: string) => ({
        url: `/v2.2/films/${id}/facts`,
        headers
      })
    }),
    getDetailsPerson: build.query<IPersonDetail, string | undefined>({
      query: (id: string) => ({
        url: `/v1/staff/${id}`,
        headers
      })
    }),
    getSimilarsMovie: build.query<ServerResponse<IRelatedFilms>, string | undefined>({
      query: (id: string) => ({
        url: `/v2.2/films/${id}/similars`,
        headers
      })
    })
  })
})

export const { 
  useMainMoviesQuery, 
  useMoviesSearchQuery, 
  useGetMovieDetailsQuery, 
  useGetStaffMovieQuery,
  useGetBudgetMovieQuery,
  useGetDistributionMovieQuery,
  useGetPrequelMoviesQuery,
  useGetFactsMovieQuery,
  useGetDetailsPersonQuery,
  useGetSimilarsMovieQuery
} = movieApi