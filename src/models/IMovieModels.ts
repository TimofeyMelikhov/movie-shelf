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

export interface IMovieDetail {
  kinopoiskId: number
  nameRu: string
  nameOriginal: string
  posterUrl: string
  posterUrlPreview: string
  coverUrl: string
  reviewsCount: number,
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
  age: number
  birthplace: string
  profession: string
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

export interface ISequelPrequel {
  filmId: number
  nameRu: string
  nameOriginal: string
  posterUrlPreview: string
  relationType: string
}