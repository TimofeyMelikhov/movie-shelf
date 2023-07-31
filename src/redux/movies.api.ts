import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
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
  IPersonDetail,
  CombinedData
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

    // getCombineDataOnMovie: build.query<CombinedData, string>({
    //   async queryFn(id: string, _queryApi, _extraOptions, fetchWithBQ) {

    //     const baseDetailMovie = await fetchWithBQ(`v2.2/films/${id}`)
    //     if(baseDetailMovie.error)
    //       return {error: baseDetailMovie.error as FetchBaseQueryError}
        
    //     const budgetMovie = await fetchWithBQ(`/v2.2/films/${id}/box_office`)
    //     if(budgetMovie.error)
    //       return {error: budgetMovie.error as FetchBaseQueryError}

    //     const StaffMovie = await fetchWithBQ(`/v2.2/films/${id}/box_office`)
    //     if(StaffMovie.error)
    //       return {error: StaffMovie.error as FetchBaseQueryError}  

    //     const DistributionMovie = await fetchWithBQ(`/v2.2/films/${id}/distributions`)
    //     if(DistributionMovie.error)
    //       return {error: DistributionMovie.error as FetchBaseQueryError}  

    //     const PrequelMovies = await fetchWithBQ(`v2.1/films/${id}/sequels_and_prequels`)
    //     if(PrequelMovies.error)
    //       return {error: PrequelMovies.error as FetchBaseQueryError}  

    //     const FactsMovie = await fetchWithBQ(`/v2.2/films/${id}/facts`)
    //     if(FactsMovie.error)
    //       return {error: FactsMovie.error as FetchBaseQueryError}  

    //     const SimilarsMovie = await fetchWithBQ(`/v2.2/films/${id}/similars`)
    //     if(SimilarsMovie.error)
    //       return {error: SimilarsMovie.error as FetchBaseQueryError}  

    //     const combinedData: CombinedData = {
    //       movieDetails: baseDetailMovie.data as IMovieDetail,
    //       budget: budgetMovie.data as ServerResponse<IBudget>,
    //       staff: StaffMovie.data as IStaff[],
    //       distribution: DistributionMovie.data as ServerResponse<IDistribution>,
    //       FactsMovie: FactsMovie.data as ServerResponse<IFacts>,
    //       PrequelMovies: PrequelMovies.data as IRelatedFilms[],
    //       SimilarsMovie: SimilarsMovie.data as ServerResponse<IRelatedFilms>
    //     }
    //     return combinedData
    //   }
    // }),

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
  useGetSimilarsMovieQuery,
  // useGetCombineDataOnMovieQuery
} = movieApi