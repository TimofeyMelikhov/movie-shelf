import top250 from '../../img/filmCollections/250.png'
import bestMovies from '../../img/filmCollections/bestMovies.png'
import catastrophe from '../../img/filmCollections/catastrophe.png'
import comics from '../../img/filmCollections/comics.png'
import family from '../../img/filmCollections/family.jpg'
import kids from '../../img/filmCollections/kids.png'
import love from '../../img/filmCollections/love.png'
import oskar from '../../img/filmCollections/oskar.png'
import vampire from '../../img/filmCollections/vampire.png'
import zombie from '../../img/filmCollections/zombie.png'
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
	},
	{
		id: 7,
		title: 'Недавние релизы',
		total: 35,
		pictures: bestMovies,
		typeCollection: 'CLOSES_RELEASES'
	},
	{
		id: 8,
		title: 'Семейное кино',
		total: 230,
		pictures: family,
		typeCollection: 'FAMILY'
	},
	{
		id: 9,
		title: 'Обладатели оскоров 2021',
		total: 15,
		pictures: oskar,
		typeCollection: 'OSKAR_WINNERS_2021'
	},
	{
		id: 10,
		title: 'Фильмы про любовь и страсть: список лучших романтических фильмов',
		total: 70,
		pictures: love,
		typeCollection: 'LOVE_THEME'
	},
	{
		id: 11,
		title: 'Фильмы про зомби: список лучших фильмов про живых мертвецов',
		total: 31,
		pictures: zombie,
		typeCollection: 'ZOMBIE_THEME'
	},
	{
		id: 12,
		title: 'Фильмы-катастрофы',
		total: 30,
		pictures: catastrophe,
		typeCollection: 'CATASTROPHE_THEME'
	},
	{
		id: 13,
		title: 'Мультфильмы для самых маленьких',
		total: 30,
		pictures: kids,
		typeCollection: 'KIDS_ANIMATION_THEME'
	}
]
