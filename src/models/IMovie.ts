export interface IMovie {
  kinopoiskId: number
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