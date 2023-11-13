import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { Movies } from '../../../components/movie/Movies'
import { Preloader } from '../../../components/preloader/Preloader'

import { useGetMoviesFromCollectionQuery } from '../../../redux/movies.api'

import classes from './listCollection.module.css'

export const ListCollection = () => {
	const { id } = useParams<'id'>()

	const [page, setPage] = useState<number>(1)

	const {
		data: movie,
		isError,
		isLoading,
		isFetching
	} = useGetMoviesFromCollectionQuery({
		id,
		page
	})

	return (
		<div className={classes.main_container}>
			<div className={classes.movie_container}>
				{isLoading || isFetching ? (
					<Preloader />
				) : (
					movie?.items.map(movie => (
						<Movies key={movie.kinopoiskId} movie={movie} />
					))
				)}
				{isError && <div>Произлшла ошибка...</div>}
			</div>
		</div>
	)
}
