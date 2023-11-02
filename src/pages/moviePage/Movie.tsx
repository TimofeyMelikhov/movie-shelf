import { Container } from '@mui/material'

import { AdvancedSearch } from '../../components/advancedSearch/AdvancedSearch'
import { Movies } from '../../components/movie/Movies'
import { Preloader } from '../../components/preloader/Preloader'

import { useMainMoviesQuery } from '../../redux/movies.api'

import classes from './movie.module.css'

export default function Movie() {
	const {
		data: movies,
		isLoading,
		isError
	} = useMainMoviesQuery({
		title: '',
		country: 1,
		genre: 17,
		order: 'RATING',
		type: 'FILM'
	})

	return (
		<div className={classes.main_container}>
			<div className={classes.movie_container}>
				<Container>
					<div>
						<h2 className='text-[32px]'>Расширенный поиск</h2>
						<span>Расширенный поиск фильмов по жанрам и странам</span>
					</div>
					<AdvancedSearch />

					<div className='flex flex-wrap justify-between'>
						{isLoading ? (
							<Preloader />
						) : (
							movies?.items?.map(movie => (
								<Movies key={movie.kinopoiskId} movie={movie} />
							))
						)}
					</div>
				</Container>
			</div>
		</div>
	)
}
