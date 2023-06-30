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

export interface ISearchMovie {
  filmId: number
  nameRu: string
  nameEn: string
  type: string
  year: string
  description: string
  filmLength: string
  rating: string
  ratingVoteCount: number
  posterUrlPreview: string
  countries: ICountry[]
  genres: IGenre[]
}