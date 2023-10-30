import { useEffect } from 'react'

import { useSelect } from '../../hooks/select'

import { useGetFiltersForMovieQuery } from '../../redux/movies.api'

import classes from './movie.module.css'

export default function Movie() {
	const { data } = useGetFiltersForMovieQuery()

	const selectForCountry = useSelect('')
	const selectForGenres = useSelect('')

	return (
		<div className={classes.main_container}>
			<div className={classes.movie_container}>
				<div>
					<h2>Расширенный поиск</h2>
				</div>
				<div className='flex-none'>
					<h3>Искать фильм:</h3>
					<input type='text' className='border' />
					<select
						value={selectForCountry.value}
						onChange={selectForCountry.onChange}
					>
						{data?.countries.map(item => (
							<option key={item.id}>{item.country}</option>
						))}
					</select>
					<select
						value={selectForGenres.value}
						onChange={selectForGenres.onChange}
					>
						{data?.genres.map(item => (
							<option key={item.id}>{item.genre}</option>
						))}
					</select>
				</div>
				<div> Выбранная страна: {selectForCountry.value} </div>
				<div> Выбранный жанр: {selectForGenres.value} </div>
			</div>
		</div>
	)
}
