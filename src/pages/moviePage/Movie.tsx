import { Container, Pagination } from '@mui/material'

import { AdvancedSearch } from '../../components/advancedSearch/AdvancedSearch'
import { Movies } from '../../components/movie/Movies'
import { Preloader } from '../../components/preloader/Preloader'

import { useLazyMainMoviesQuery } from '../../redux/movies.api'

import classes from './movie.module.css'

export default function Movie() {
	const [getMoviesOnfiltres, { data: moviesOnFilters, isLoading, isFetching }] =
		useLazyMainMoviesQuery()

	return (
		<div className={classes.main_container}>
			<div className={classes.movie_container}>
				<Container>
					<div>
						<h2 className='text-[32px]'>Расширенный поиск</h2>
						<span>Расширенный поиск фильмов по жанрам, странам и тд.</span>
					</div>
					<AdvancedSearch
						getMoviesOnfiltres={getMoviesOnfiltres}
						count={moviesOnFilters?.totalPages}
					/>

					<div className='flex flex-wrap justify-between'>
						{isLoading || isFetching ? (
							<Preloader />
						) : (
							moviesOnFilters?.items?.map(movie => (
								<Movies key={movie.kinopoiskId} movie={movie} />
							))
						)}
					</div>
				</Container>
			</div>
		</div>
	)
}
