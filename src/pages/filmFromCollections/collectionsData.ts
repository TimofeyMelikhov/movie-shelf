import top250 from '../../img/filmCollections/250.png'
import bestMovies from '../../img/filmCollections/bestMovies.png'
import comics from '../../img/filmCollections/comics.png'
import vampire from '../../img/filmCollections/vampire.png'
import { ICollections } from '../../models/IMovieModels'

export const collections: ICollections[] = [
	{
		id: 1,
		title: '250 лучших фильмов',
		total: 250,
		pictures: top250,
		typeCollection: 'TOP_250_MOVIES'
	},
	{
		id: 2,
		title: '250 лучших сериалов',
		total: 250,
		pictures: top250,
		typeCollection: 'TOP_250_TV_SHOWS'
	},
	{
		id: 3,
		title: 'Популярные фильмы',
		total: 700,
		pictures: bestMovies,
		typeCollection: 'TOP_POPULAR_MOVIES'
	},
	{
		id: 4,
		title: 'Топ популярных',
		total: 250,
		pictures: bestMovies,
		typeCollection: 'TOP_POPULAR_ALL'
	},
	{
		id: 5,
		title: 'Фильмы про вампиров',
		total: 30,
		pictures: vampire,
		typeCollection: 'VAMPIRE_THEME'
	},
	{
		id: 6,
		title: 'Лучшие фильмы, основанные на комиксах',
		total: 100,
		pictures: comics,
		typeCollection: 'COMICS_THEME'
	}
	// {
	// 	id: 7,
	// 	title: '500 лучших фильмов',
	// 	total: 500,
	// 	pictures: '../../../img/filmCollections/500.png',
	// 	typeCollection: ''
	// },
	// {
	// 	id: 8,
	// 	title: '500 лучших фильмов',
	// 	total: 500,
	// 	pictures: '../../../img/filmCollections/500.png',
	// 	typeCollection: ''
	// },
	// {
	// 	id: 9,
	// 	title: '500 лучших фильмов',
	// 	total: 500,
	// 	pictures: '../../../img/filmCollections/500.png',
	// 	typeCollection: ''
	// },
	// {
	// 	id: 10,
	// 	title: '500 лучших фильмов',
	// 	total: 500,
	// 	pictures: '../../../img/filmCollections/500.png',
	// 	typeCollection: ''
	// },
	// {
	// 	id: 11,
	// 	title: '500 лучших фильмов',
	// 	total: 500,
	// 	pictures: '../../../img/filmCollections/500.png',
	// 	typeCollection: ''
	// },
	// {
	// 	id: 12,
	// 	title: '500 лучших фильмов',
	// 	total: 500,
	// 	pictures: '../../../img/filmCollections/500.png',
	// 	typeCollection: ''
	// },
	// {
	// 	id: 13,
	// 	title: '500 лучших фильмов',
	// 	total: 500,
	// 	pictures: '../../../img/filmCollections/500.png',
	// 	typeCollection: ''
	// }
]
