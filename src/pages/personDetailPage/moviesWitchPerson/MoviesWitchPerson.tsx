import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { IPersonFilms } from '../../../models/IMovieModels'

import classes from './moviesWitchPerson.module.css'

interface IMoviesPersonProp {
	personMovies?: IPersonFilms[]
}

export const MoviesWitchPerson: React.FC<IMoviesPersonProp> = ({
	personMovies
}) => {
	const itemsPerPage = 10
	const [visibleItems, setVisibleItems] = useState(itemsPerPage)

	const showMoreItems = () => {
		setVisibleItems(prevVisibleItems => prevVisibleItems + itemsPerPage)
	}

	const films = personMovies?.filter(item => item.professionKey === 'ACTOR')

	const moviesList = films?.slice(0, visibleItems).map(item => (
		<div key={item.filmId} className='border-b-2 hover:bg-gray-100 px-2 py-2'>
			<NavLink to={`/film/${item.filmId}`}>
				<div className='flex justify-between mb-[10px]'>
					<div className='flex flex-col'>
						<span> {item.nameRu} </span>
						<span className='text-[12px]'> {item.nameEn} </span>
					</div>
					<div
						className={
							item?.rating >= '7'
								? classes.high_rating
								: item?.rating && item?.rating >= '5.1' && item?.rating <= '6.9'
								? classes.medium_rating
								: classes.low_rating
						}
					>
						{item.rating}
					</div>
				</div>
			</NavLink>
		</div>
	))

	return (
		<div>
			{moviesList}
			{films && visibleItems < films.length && (
				<button
					className='bg-black bg-opacity-5 rounded-[100px] text-[15px] mt-[15px] px-[14px] py-[4px] hover:scale-105'
					onClick={showMoreItems}
				>
					<span className={classes.factsButton}> Показать еще </span>
				</button>
			)}
		</div>
	)
}
