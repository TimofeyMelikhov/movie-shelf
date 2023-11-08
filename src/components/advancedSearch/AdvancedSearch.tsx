import { FormControl, Pagination } from '@mui/material'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { useState } from 'react'

import { useInput } from '../../hooks/input'
import { useSelect } from '../../hooks/select'

import { IFiltersForMovies } from '../../models/IMovieModels'
import { useGetFiltersForMovieQuery } from '../../redux/movies.api'
import { MainSelect } from '../ui/MainSelect'

interface IPropSearch {
	getMoviesOnfiltres: (params: IFiltersForMovies) => void
	count: number | undefined
}

export const AdvancedSearch = ({ getMoviesOnfiltres, count }: IPropSearch) => {
	const [page, setPage] = useState(1)

	const selectForCountry = useSelect()
	const selectForGenres = useSelect()
	const selectForType = useSelect()
	const selectForSort = useSelect()
	const searchMovie = useInput()

	const { data } = useGetFiltersForMovieQuery()

	const handleChange = (e: any, page: number) => {
		setPage(page)
		getMoviesOnfiltres({
			title: searchMovie.value,
			country: Number(selectForCountry.value),
			genre: Number(selectForGenres.value),
			order: selectForSort.value,
			type: selectForType.value,
			page
		})
	}

	return (
		<>
			<div className='flex justify-between mt-4 mb-2'>
				<div>
					<TextField
						id='outlined-basic'
						type='search'
						label='Название фильма'
						variant='outlined'
						value={searchMovie.value}
						onChange={searchMovie.onChange}
					/>
				</div>

				<MainSelect
					id='genres-label'
					label='Выберите жанр'
					labelId='genres-label'
					title='Выберите жанр'
					titleId='genres-label'
					value={selectForGenres.value}
					onChange={selectForGenres.onChange}
					options={
						data?.countries.map(item => ({
							id: item.id,
							options: item.country
						})) || []
					}
				/>
				<MainSelect
					id='country-label'
					label='Выберите страну'
					labelId='country-label'
					title='Выберите страну'
					titleId='country-label'
					value={selectForCountry.value}
					onChange={selectForCountry.onChange}
					options={
						data?.genres.map(item => ({ id: item.id, options: item.genre })) ||
						[]
					}
				/>

				{/* <div>
					<FormControl fullWidth className='flex'>
						<InputLabel id='genres-label'>Выберите жанр</InputLabel>
						<Select
							labelId='genres-label'
							id='genres-label'
							label='Выберите жанр'
							value={selectForGenres.value}
							onChange={selectForGenres.onChange}
						>
							<MenuItem value=''>—</MenuItem>
							{data?.genres.map(item => (
								<MenuItem key={item.id} value={item.id}>
									{item.genre}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>

				<div>
					<FormControl fullWidth className='flex'>
						<InputLabel id='type-label'>Что искать?</InputLabel>
						<Select
							labelId='type-label'
							id='type-label'
							label='Что искать?'
							value={selectForType.value}
							onChange={selectForType.onChange}
						>
							<MenuItem value='ALL'>Все</MenuItem>
							<MenuItem value='FILM'>Фильм</MenuItem>
							<MenuItem value='TV_SHOW'>Тв шоу</MenuItem>
							<MenuItem value='TV_SERIES'>Сериал</MenuItem>
							<MenuItem value='MINI_SERIES'>Мини сериал</MenuItem>
						</Select>
					</FormControl>
				</div>

				<div>
					<FormControl fullWidth className='flex'>
						<InputLabel id='type-label'>Сортировать по:</InputLabel>
						<Select
							labelId='type-label'
							id='type-label'
							label='Сортировать по:'
							value={selectForSort.value}
							onChange={selectForSort.onChange}
						>
							<MenuItem value='RATING'>Рейтинг</MenuItem>
							<MenuItem value='NUM_VOTE'>Кол-во оценок</MenuItem>
							<MenuItem value='YEAR'>Год</MenuItem>
						</Select>
					</FormControl> 
								</div>
					*/}

				<div className='mt-2'>
					<Button
						onClick={() =>
							getMoviesOnfiltres({
								title: searchMovie.value,
								country: Number(selectForCountry.value),
								genre: Number(selectForGenres.value),
								order: selectForSort.value,
								type: selectForType.value
							})
						}
						variant='outlined'
					>
						Поиск
					</Button>
				</div>
			</div>

			{count && (
				<div className='flex mt-2 mb-2 justify-center'>
					<Pagination
						count={count}
						variant='outlined'
						page={page}
						onChange={handleChange}
					/>
				</div>
			)}
		</>
	)
}
