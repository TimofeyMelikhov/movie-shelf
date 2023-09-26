import React, { MouseEventHandler, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import { Preloader } from '../../components/preloader/Preloader'

import { useGetDetailsPersonQuery } from '../../redux/movies.api'
import {
	addToFavoritePerson,
	removeFromFavorites
} from '../../redux/slices/favoritePersonSlice'
import { ageTransformation, formatDate } from '../../utils/formatter'

import { MoviesWitchPerson } from './moviesWitchPerson/MoviesWitchPerson'
import classes from './personDetails.module.css'

export function PersonDetails() {
	const { id } = useParams<'id'>()
	const {
		data: personDetail,
		isLoading,
		isError,
		refetch
	} = useGetDetailsPersonQuery(id, { skip: !id })
	const favoritePerson = useAppSelector(state => state.favoritePerson)
	const dispatch = useAppDispatch()

	const isExistsInFavorite = favoritePerson.some(
		p => p.personId === personDetail?.personId
	)

	const [favoritePersonButton, setFavoritePersonButton] =
		useState(isExistsInFavorite)

	const clickHandler: MouseEventHandler<HTMLButtonElement> = (): void => {
		setFavoritePersonButton(prev => !prev)
		if (personDetail) {
			if (!isExistsInFavorite) {
				dispatch(addToFavoritePerson(personDetail))
			} else {
				dispatch(removeFromFavorites(personDetail.personId))
			}
		}
	}

	const generateMovieLinks = () => {
		const bestFilteredMovie = personDetail?.films
			.filter(item => item.professionKey === 'ACTOR')
			.slice()
			.sort((a, b) => Number(b.rating) - Number(a.rating))
			.map(item =>
				item.nameRu ? (
					<React.Fragment key={item.filmId}>
						<NavLink to={`/film/${item.filmId}`} className={classes.hov_staff}>
							{item.nameRu}
						</NavLink>
					</React.Fragment>
				) : null
			)
		return bestFilteredMovie?.slice(0, 7)
	}

	const bestMovie = generateMovieLinks()

	const spoucesName = personDetail?.spouses.map(item => (
		<span>
			<span className={classes.hov_staff}>
				<NavLink to={`/name/${item.personId}`}>
					{item.name} {item.divorced && '(развод)'}
				</NavLink>
			</span>
			{item.children > 0 && (
				<span className='text-[12px]'> {`${item.children} детей`} </span>
			)}
		</span>
	))

	const spouceSex = personDetail?.spouses.map(
		item => item.relation.charAt(0).toUpperCase() + item.relation.slice(1)
	)[0]

	useEffect(() => {
		refetch()
	}, [id, refetch])

	return (
		<>
			{isError && <p>{isError}</p>}

			{isLoading ? (
				<Preloader />
			) : (
				<div className='container mx-auto p-5 max-w-[1300px] bg-white min-h-[100vh]'>
					<div className='flex'>
						<div className='flex flex-col'>
							<img src={personDetail?.posterUrl} alt='poster' width='300px' />
						</div>
						<div className='flex flex-col ml-[40px] text-[13px]'>
							<h1 className={classes.header}>{personDetail?.nameRu}</h1>
							<div className={classes.origName}>{personDetail?.nameEn}</div>
							<button className={classes.buttonFav} onClick={clickHandler}>
								<span
									className={
										!favoritePersonButton ? classes.heart : classes.heart_active
									}
								/>
								Любимая звезда
							</button>
							<div className='mt-[50px] text-[22px]'>О персоне</div>

							<div className='mt-[5px]'>
								<span className='text-gray-600 inline-flex w-[150px]'>
									Карьера:
								</span>
								{personDetail?.profession}
							</div>

							<div className='mt-[5px]'>
								<span className='text-gray-600 inline-flex w-[150px]'>
									Рост:
								</span>
								{personDetail?.growth}
							</div>

							<div className='mt-[5px]'>
								<span className='text-gray-600 inline-flex w-[150px]'>
									Дата рождения:
								</span>
								{formatDate(String(personDetail?.birthday))} •{' '}
								{personDetail?.age} лет
							</div>

							<div className='mt-[5px]'>
								<span className='text-gray-600 inline-flex w-[150px]'>
									Место рождения:
								</span>
								{personDetail?.birthplace}
							</div>

							{personDetail?.death && (
								<div className='mt-[5px] text-gray-400'>
									<span className='text-gray-600 inline-flex w-[150px]'>
										Дата смерти:
									</span>
									{formatDate(String(personDetail?.death))}
								</div>
							)}

							{personDetail?.deathplace && (
								<div className='mt-[5px] text-gray-400'>
									<span className='text-gray-600 inline-flex w-[150px]'>
										Место смерти:
									</span>
									{personDetail?.deathplace}
								</div>
							)}

							{spoucesName?.length !== 0 && (
								<div className='flex mt-[5px]'>
									<span className='text-gray-600 inline-flex w-[150px]'>
										{spouceSex}:
									</span>
									<span className='flex flex-col'>{spoucesName}</span>
								</div>
							)}

							<div className='mt-[5px]'>
								<span className='text-gray-600 inline-flex w-[150px]'>
									Всего фильмов:
								</span>
								{personDetail?.films.length}
							</div>
						</div>

						<div className='flex flex-col ml-[70px] mt-[125px]'>
							<h3 className='text-[18px]'>Лучшие фильмы</h3>
							<div className='flex flex-col mt-[10px] text-[13px]'>
								{bestMovie}
							</div>
						</div>
					</div>
					<div className='mt-[30px]'>
						<h2 className='text-2xl'> Знаете ли вы, что… </h2>
						{personDetail?.facts
							.map((f, index) => (
								<p key={index} className='mt-[7px] border-b-2'>
									{f}
								</p>
							))
							.slice(0, 3)}
					</div>
					<div className='mt-[25px]'>
						<span className='text-[32px]'>Фильмы:</span>
						<MoviesWitchPerson personMovies={personDetail?.films} />
					</div>
				</div>
			)}
		</>
	)
}
