import React from 'react'

import { Menu } from '../../components/menu/Menu'
import { Movies } from '../../components/movie/Movies'
import { Preloader } from '../../components/preloader/Preloader'

import { useMainMoviesQuery } from '../../redux/movies.api'

import classes from './main.module.css'

export const MainPage: React.FC = () => {
	const {
		data: movies,
		isLoading,
		isError
	} = useMainMoviesQuery({
		title: ''
	})

	return (
		<div className={classes.main_container}>
			<Menu />
			<div className={classes.movie_container}>
				{isLoading ? (
					<Preloader />
				) : (
					movies?.items?.map(movie => (
						<Movies key={movie.kinopoiskId} movie={movie} />
					))
				)}
				{isError && (
					<img src='https://http.cat/402' className='w-[550px]' alt='' />
				)}
			</div>
		</div>
	)
}
