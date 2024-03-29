export interface IMovie {
	kinopoiskId: string
	nameRu: string
	posterUrl: string
	posterUrlPreview: string
	ratingKinopoisk: number
	ratingImdb: number
	webUrl: string
	year: number
	filmLength: number
	slogan: string
	description: string
	shortDescription: string
	ratingAgeLimits: string
	countries: ICountry[]
	genres: IGenre[]
}

interface ICountry {
	country: string
}
interface IGenre {
	genre: string
}

export interface ServerMoviesResponse<T> {
	total: number
	totalPages: number
	items: T[]
}

export interface ServerSearchResponse<T> {
	keyword: string
	pagesCount: number
	searchFilmsCountResult: number
	films: T[]
}

export interface ServerResponse<T> {
	total: number
	items: T[]
}

export interface IMovieTrailer {
	url: string
	name: string
	site: string
}

export interface IMovieDetail {
	kinopoiskId: number
	nameRu: string
	nameOriginal: string
	posterUrl: string
	posterUrlPreview: string
	coverUrl: string
	reviewsCount: number
	ratingKinopoisk: number
	ratingImdb: number
	ratingFilmCritics: number
	webUrl: string
	year: number
	filmLength: number
	slogan: string
	description: string
	shortDescription: string
	type: string
	ratingMpaa: string
	ratingAgeLimits: string
	ratingKinopoiskVoteCount: number
	countries: ICountry[]
	genres: IGenre[]
}

export interface IPersonDetail {
	personId: number
	nameRu: string
	nameEn: string
	sex: string
	posterUrl: string
	growth: string
	birthday: string
	deathplace: string
	age: number
	death: string
	birthplace: string
	profession: string
	facts: [string]
	spouses: ISpouses[]
	films: IPersonFilms[]
}

export interface ISpouses {
	personId: number
	name: string
	divorced: boolean
	divorcedReason: string
	sex: string
	children: number
	relation: string
}

export interface IResponseReviews<T> extends ServerMoviesResponse<T> {
	totalPositiveReviews: number
	totalNegativeReviews: number
	totalNeutralReviews: number
}

export interface IReviews {
	kinopoiskId: number
	type: string
	date: string
	positiveRating: number
	negativeRating: number
	author: string
	title: string
	description: string
}

export interface IPersonFilms {
	filmId: number
	nameRu: string
	nameEn: string
	rating: string
	description: string
	professionKey: string
}

export interface IBudget {
	type: string
	amount: number
	currencyCode: string
	name: string
	symbol: string
}
export interface IStaff {
	staffId: number
	nameRu: string
	nameEn: string
	posterUrl: string
	professionText: string
	professionKey: string
}

export interface IDistribution {
	type: string
	subType: string
	date: string
	reRelease: boolean
	country: null | ICountry
	companies: ICompanies
}

interface ICompanies {
	name: string
}

export interface IFacts {
	text: string
	type: string
	spoiler: boolean
}

export interface ISearchMovie {
	filmId: number
	nameRu: string
	nameEn: string
	year: string
	rating: string
	posterUrlPreview: string
}

export interface ISearchPerson {
	kinopoiskId: number
	nameRu: string
	nameEn: string
	posterUrl: string
}

export interface IRelatedFilms {
	filmId: number
	nameRu: string
	nameOriginal: string
	posterUrlPreview: string
	relationType: string
}

export interface CombinedData {
	movieDetails: IMovieDetail
	budget: ServerResponse<IBudget>
	distribution: ServerResponse<IDistribution>
	staff: IStaff[]
	PrequelMovies: IRelatedFilms[]
	FactsMovie: ServerResponse<IFacts>
	SimilarsMovie: ServerResponse<IRelatedFilms>
	reviewsMovie: IResponseReviews<IReviews>
	movieTrailers: ServerResponse<IMovieTrailer>
	awards: ServerResponse<IAwards>
}

export interface IFilters {
	genres: [
		{
			id: number
			genre: string
		}
	]
	countries: [
		{
			id: number
			country: string
		}
	]
}

export interface IFiltersForMovies {
	title?: string
	country?: number
	genre?: number
	type?: string
	order?: string
	page?: number
}

export interface ICollections {
	id: number
	title: string
	total: number
	pictures: string
	typeCollection: string
}

export type TypeForCollection = {
	id: string | undefined
	page: number
}

export interface IAwards {
	name: string
	win: boolean
	imageUrl: string | null
	nominationName: string
	year: number
	persons: AwardsPerosn[] | []
}

type AwardsPerosn = Omit<IPersonDetail, 'facts' | 'spouses' | 'films'>
