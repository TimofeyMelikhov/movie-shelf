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
  CombinedData,
  ISearchPerson
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

    searchPerson: build.query<ServerMoviesResponse<ISearchPerson>, string>({
      query: (debounced: string) => ({
        url: `/v1/persons?name=${debounced}`
      })
    }),

    getCombineDataOnMovie: build.query<CombinedData, string | undefined>({
      async queryFn(id: string, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          const baseDetailMovie = await fetchWithBQ(`v2.2/films/${id}`);
          const budgetMovie = await fetchWithBQ(`/v2.2/films/${id}/box_office`);
          const StaffMovie = await fetchWithBQ(`/v1/staff?filmId=${id}`);
          const DistributionMovie = await fetchWithBQ(`/v2.2/films/${id}/distributions`);
          const FactsMovie = await fetchWithBQ(`/v2.2/films/${id}/facts`);
          const SimilarsMovie = await fetchWithBQ(`/v2.2/films/${id}/similars`);
    
          let PrequelMovies;
          try {
            PrequelMovies = await fetchWithBQ(`v2.1/films/${id}/sequels_and_prequels`);
          } catch (error) {
            PrequelMovies = undefined;
          }
    
          const combinedData: CombinedData = {
            movieDetails: baseDetailMovie.data as IMovieDetail,
            budget: budgetMovie.data as ServerResponse<IBudget>,
            staff: StaffMovie.data as IStaff[],
            distribution: DistributionMovie.data as ServerResponse<IDistribution>,
            FactsMovie: FactsMovie.data as ServerResponse<IFacts>,
            PrequelMovies: PrequelMovies?.data as IRelatedFilms[],
            SimilarsMovie: SimilarsMovie.data as ServerResponse<IRelatedFilms>,
          };
    
          return { data: combinedData };
        } catch (error) {
          return { error: error as FetchBaseQueryError };
        }
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
  useGetCombineDataOnMovieQuery,
  useSearchPersonQuery
} = movieApi