import {
	FetchBaseQueryError,
	createApi,
	fetchBaseQuery
} from '@reduxjs/toolkit/query/react'

import {
	CombinedData,
	IBudget,
	IDistribution,
	IFacts,
	IFilters,
	IMovie,
	IMovieDetail,
	IMovieTrailer,
	IPersonDetail,
	IRelatedFilms,
	IResponseReviews,
	IReviews,
	ISearchMovie,
	ISearchPerson,
	IStaff,
	ServerMoviesResponse,
	ServerResponse,
	ServerSearchResponse
} from '../models/IMovieModels'

interface IFiltersForMovies {
	title?: string
	country?: number
	genre?: number
	type?: string
	order?: string
}

export const movieApi = createApi({
	reducerPath: 'movieApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://kinopoiskapiunofficial.tech/api',
		prepareHeaders: headers => {
			headers.set('X-API-KEY', '03b257a3-99b3-43ff-be90-2f7b5b72e260')
			headers.set('Content-Type', 'application/json')
			return headers
		}
	}),
	endpoints: build => ({
		mainMovies: build.query<ServerMoviesResponse<IMovie>, IFiltersForMovies>({
			query: ({ title, country, genre, type, order }) => ({
				url: `/v2.2/films`,
				params: {
					countries: country,
					genres: genre,
					order,
					type,
					ratingFrom: 0,
					ratingTo: 10,
					yearFrom: 1000,
					yearTo: 3000,
					page: 1,
					keyword: title
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
					const baseDetailMovie = await fetchWithBQ(`v2.2/films/${id}`)
					const budgetMovie = await fetchWithBQ(`/v2.2/films/${id}/box_office`)
					const StaffMovie = await fetchWithBQ(`/v1/staff?filmId=${id}`)
					const DistributionMovie = await fetchWithBQ(
						`/v2.2/films/${id}/distributions`
					)
					const FactsMovie = await fetchWithBQ(`/v2.2/films/${id}/facts`)
					const SimilarsMovie = await fetchWithBQ(`/v2.2/films/${id}/similars`)
					const reviews = await fetchWithBQ(
						`/v2.2/films/${id}/reviews?page=1&order=DATE_DESC`
					)
					const trailer = await fetchWithBQ(`/v2.2/films/${id}/videos`)

					let PrequelMovies
					try {
						PrequelMovies = await fetchWithBQ(
							`v2.1/films/${id}/sequels_and_prequels`
						)
					} catch (error) {
						PrequelMovies = undefined
					}

					const combinedData: CombinedData = {
						movieDetails: baseDetailMovie.data as IMovieDetail,
						budget: budgetMovie.data as ServerResponse<IBudget>,
						staff: StaffMovie.data as IStaff[],
						distribution:
							DistributionMovie.data as ServerResponse<IDistribution>,
						FactsMovie: FactsMovie.data as ServerResponse<IFacts>,
						PrequelMovies: PrequelMovies?.data as IRelatedFilms[],
						SimilarsMovie: SimilarsMovie.data as ServerResponse<IRelatedFilms>,
						reviewsMovie: reviews.data as IResponseReviews<IReviews>,
						movieTrailers: trailer.data as ServerResponse<IMovieTrailer>
					}

					return { data: combinedData }
				} catch (error) {
					return { error: error as FetchBaseQueryError }
				}
			}
		}),
		getDetailsPerson: build.query<IPersonDetail, string | undefined>({
			query: (id: string) => ({
				url: `/v1/staff/${id}`
			})
		}),
		getFiltersForMovie: build.query<IFilters, void>({
			query: () => ({
				url: '/v2.2/films/filters'
			})
		})
	})
})

export const {
	useMainMoviesQuery,
	useLazyMainMoviesQuery,
	useMoviesSearchQuery,
	useGetDetailsPersonQuery,
	useGetCombineDataOnMovieQuery,
	useSearchPersonQuery,
	useGetFiltersForMovieQuery
} = movieApi
