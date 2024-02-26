import { Pagination } from '@mui/material'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useState } from 'react'

import { useInput } from '../../hooks/input'
import { useSelect } from '../../hooks/select'

import { IFiltersForMovies } from '../../models/IMovieModels'
import { useGetFiltersForMovieQuery } from '../../redux/movies.api'
import { MainSelect } from '../ui/MainSelect'

import { dataSort, dataType } from './menuItemData'

interface IPropSearch {
	getMoviesOnfiltres: (params: IFiltersForMovies) => void
	count: number | undefined
}

export const AdvancedSearch = ({ getMoviesOnfiltres, count }: IPropSearch) => {
	const [page, setPage] = useState<number>(1)

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
					label='Выберите страну'
					labelId='genres-label'
					title='Выберите страну'
					titleId='genres-label'
					value={selectForCountry.value}
					onChange={selectForCountry.onChange}
					options={
						data?.countries.map(item => ({
							id: item.id,
							options: item.country
						})) || []
					}
				/>

				<MainSelect
					id='country-label'
					label='Выберите жанр'
					labelId='country-label'
					title='Выберите жанр'
					titleId='country-label'
					value={selectForGenres.value}
					onChange={selectForGenres.onChange}
					options={
						data?.genres.map(item => ({
							id: item.id,
							options: item.genre
						})) || []
					}
				/>

				<MainSelect
					id='content-label'
					label='Выберите контент'
					labelId='content-label'
					title='Выберите контент'
					titleId='content-label'
					value={selectForType.value}
					onChange={selectForType.onChange}
					options={dataType || []}
				/>

				<MainSelect
					id='type-label'
					label='Сортировать по:'
					labelId='type-label'
					title='Сортировать по:'
					titleId='type-label'
					value={selectForSort.value}
					onChange={selectForSort.onChange}
					options={dataSort || []}
				/>

				<div className='mt-2'>
					<Button
						onClick={() => {
							setPage(0)
							getMoviesOnfiltres({
								title: searchMovie.value,
								country: Number(selectForCountry.value),
								genre: Number(selectForGenres.value),
								order: selectForSort.value,
								type: selectForType.value
							})
						}}
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
