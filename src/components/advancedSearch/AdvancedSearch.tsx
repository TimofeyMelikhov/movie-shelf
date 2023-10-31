import { useSelect } from '../../hooks/select'

import { useGetFiltersForMovieQuery } from '../../redux/movies.api'

export const AdvancedSearch = () => {
	const { data } = useGetFiltersForMovieQuery()

	const selectForCountry = useSelect('')
	const selectForGenres = useSelect('')

	return (
		<div>
			<div className='flex-none'>
				<h3>Искать фильм:</h3>
				<input type='text' className='border' />

				<div>
					{/* <span className='text-sm'>Выберите страну</span> */}
					<select
						value={selectForCountry.value}
						onChange={selectForCountry.onChange}
					>
						{data?.countries.map(item => (
							<option key={item.id}>{item.country}</option>
						))}
					</select>
				</div>
				<div>
					{/* <span className='text-sm'>Выберите жанр</span> */}
					<select
						value={selectForGenres.value}
						onChange={selectForGenres.onChange}
					>
						{data?.genres.map(item => (
							<option key={item.id}>{item.genre}</option>
						))}
					</select>
				</div>
			</div>
			<div> Выбранная страна: {selectForCountry.value} </div>
			<div> Выбранный жанр: {selectForGenres.value} </div>
		</div>
	)
}
