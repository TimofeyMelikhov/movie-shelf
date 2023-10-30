import React, { useEffect, useState } from 'react'

import { useDebounce } from '../../hooks/debounce'
import { useInput } from '../../hooks/input'

import {
	useMoviesSearchQuery,
	useSearchPersonQuery
} from '../../redux/movies.api'
import { Preloader } from '../preloader/Preloader'

import { SearchResultMovie } from './SearchResultMovie'
import { SearchResultPerson } from './SearchResultPerson'
import classes from './movieSearch.module.css'

export function MovieSearch() {
	const [dropdown, setDropdown] = useState(false)
	const input = useInput('')
	const debounced = useDebounce<string>(input.value, 550)
	const { isLoading, data: searchResult } = useMoviesSearchQuery(debounced, {
		skip: debounced.length < 3
	})

	const { data: personSearch, isLoading: loadPerson } = useSearchPersonQuery(
		debounced,
		{
			skip: debounced.length < 3
		}
	)

	useEffect(() => {
		setDropdown(debounced.length >= 3)
	}, [debounced])

	const clickHandler = () => {
		setDropdown(false)
		input.setvalue('')
	}

	return (
		<div className={classes.serarch_container}>
			<input
				type='text'
				className={`${classes.input_search} sm:w-64`}
				placeholder='Фильмы, сериалы, персоны'
				value={input.value}
				onChange={input.onChange}
			/>

			{dropdown && (
				<div className={`${classes.drop_down} sm:w-64`}>
					<p className='mb-[5px] ml-[15px] text-[13px] text-black text-opacity-60'>
						Фильмы и сериалы
					</p>
					{isLoading ? (
						<Preloader />
					) : (
						searchResult?.films
							?.map(film => (
								<SearchResultMovie
									key={film.filmId}
									film={film}
									onClick={() => clickHandler()}
								/>
							))
							.slice(0, 3)
					)}
					<p className='mb-[5px] ml-[15px] text-[13px] text-black text-opacity-60'>
						Персоны
					</p>
					{loadPerson ? (
						<Preloader />
					) : (
						personSearch?.items
							.map(person => (
								<SearchResultPerson
									key={person.kinopoiskId}
									onClick={() => clickHandler()}
									person={person}
								/>
							))
							.slice(0, 3)
					)}

					{!searchResult?.films.length && !personSearch?.items.length && (
						<p className='text-black text-center'>
							По вашему запросу ничего не найдено
						</p>
					)}
				</div>
			)}
		</div>
	)
}
