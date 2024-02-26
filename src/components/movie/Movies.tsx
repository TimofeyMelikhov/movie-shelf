import { useNavigate } from 'react-router-dom'

import { IMovie } from '../../models/IMovieModels'

import classes from './movies.module.css'

interface moviesProps {
	movie: IMovie
}

export const Movies = ({ movie }: moviesProps) => {
	const navigate = useNavigate()

	const clickHandler = (id: string) => {
		navigate(`/film/${movie.kinopoiskId}`)
	}

	const countries = movie.countries.map(c => c.country).join(', ')
	const genres = movie.genres.map(c => c.genre).join(', ')
	const highlitedRating =
		movie.ratingKinopoisk && movie.ratingKinopoisk >= 7
			? classes.high_rating
			: movie.ratingKinopoisk &&
			  movie.ratingKinopoisk >= 5.1 &&
			  movie.ratingKinopoisk <= 6.9
			? classes.medium_rating
			: classes.low_rating

	return (
		<div
			className={classes.wrapper}
			onClick={() => clickHandler(movie.kinopoiskId)}
		>
			<p style={{ fontSize: '20px', fontWeight: '700', cursor: 'pointer' }}>
				{movie.nameRu}
			</p>
			<img src={movie.posterUrlPreview} alt='poster' />
			<p style={{ fontSize: '32px' }}>О фильме</p>
			<p>Год производства: {movie.year} </p>
			<p>Страна: {countries} </p>
			<p>Жанр: {genres} </p>
			<p>
				Рейтинг кинопоиска:{' '}
				<span className={highlitedRating}> {movie.ratingKinopoisk} </span>{' '}
			</p>
		</div>
	)
}
