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

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://kinopoiskapiunofficial.tech/api',
    prepareHeaders: (headers) => {
      headers.set('X-API-KEY', '03b257a3-99b3-43ff-be90-2f7b5b72e260')
      headers.set('Content-Type', 'application/json')
      return headers
    }
  }),
  endpoints: build => ({
    mainMovies: build.query<ServerMoviesResponse<IMovie>, string>({
      query: () => ({
        url: `/v2.2/films`,
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
        params: {
          keyword: debounced,
          page: 1
        }
      })
    }),

    getCombineDataOnMovie: build.query<CombinedData, string | undefined>({
      async queryFn(id: string, _queryApi, _extraOptions, fetchWithBQ) {

        const baseDetailMovie = await fetchWithBQ(`v2.2/films/${id}`)
        if(baseDetailMovie.error)
          return {error: baseDetailMovie.error as FetchBaseQueryError}
        
        const budgetMovie = await fetchWithBQ(`/v2.2/films/${id}/box_office`)
        if(budgetMovie.error)
          return {error: budgetMovie.error as FetchBaseQueryError}

        const StaffMovie = await fetchWithBQ(`/v1/staff?filmId=${id}`)
        if(StaffMovie.error)
          return {error: StaffMovie.error as FetchBaseQueryError}  

        const DistributionMovie = await fetchWithBQ(`/v2.2/films/${id}/distributions`)
        if(DistributionMovie.error)
          return {error: DistributionMovie.error as FetchBaseQueryError}  

        const PrequelMovies = await fetchWithBQ(`v2.1/films/${id}/sequels_and_prequels`)
        if(PrequelMovies.error)
          return {data: undefined, error: PrequelMovies.error as FetchBaseQueryError}  

        const FactsMovie = await fetchWithBQ(`/v2.2/films/${id}/facts`)
        if(FactsMovie.error)
          return {error: FactsMovie.error as FetchBaseQueryError}  

        const SimilarsMovie = await fetchWithBQ(`/v2.2/films/${id}/similars`)
        if(SimilarsMovie.error)
          return {error: SimilarsMovie.error as FetchBaseQueryError}  

        const combinedData: CombinedData = {
          movieDetails: baseDetailMovie.data as IMovieDetail,
          budget: budgetMovie.data as ServerResponse<IBudget>,
          staff: StaffMovie.data as IStaff[],
          distribution: DistributionMovie.data as ServerResponse<IDistribution>,
          FactsMovie: FactsMovie.data as ServerResponse<IFacts>,
          PrequelMovies: PrequelMovies.data as IRelatedFilms[],
          SimilarsMovie: SimilarsMovie.data as ServerResponse<IRelatedFilms>
        }
        return {data: combinedData}
      }
    }),
    getDetailsPerson: build.query<IPersonDetail, string | undefined>({
      query: (id: string) => ({
        url: `/v1/staff/${id}`,
      })
    }),
  })
})

export const { 
  useMainMoviesQuery, 
  useMoviesSearchQuery, 
  useGetDetailsPersonQuery,
  useGetCombineDataOnMovieQuery
} = movieApi