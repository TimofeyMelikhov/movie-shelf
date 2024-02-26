import { Pagination } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Movies } from '../../../components/movie/Movies'
import { Preloader } from '../../../components/preloader/Preloader'

import { useLazyGetMoviesFromCollectionQuery } from '../../../redux/movies.api'

import classes from './listCollection.module.css'

export const ListCollection = () => {
	const { id } = useParams<'id'>()

	const [page, setPage] = useState<number>(1)

	const [getM, { data: movie, isError, isLoading, isFetching }] =
		useLazyGetMoviesFromCollectionQuery()

	const handleChange = (e: any, page: number) => {
		setPage(page)
		getM({
			id,
			page
		})
	}

	useEffect(() => {
		getM({
			id,
			page
		})
	}, [getM, id, page])

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
				{movie?.totalPages && (
					<div className='block mt-2 mb-2 justify-center'>
						<Pagination
							count={movie?.totalPages}
							variant='outlined'
							page={page}
							onChange={handleChange}
						/>
					</div>
				)}
			</div>
		</div>
	)
}
