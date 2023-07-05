import React, { useEffect } from 'react'
import classes from './personDetails.module.css'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchDetailsPerson } from '../../redux/actions/PersonDetailAction'

export function PersonDetails() {

  const {id} = useParams<'id'>()
  const dispatch = useAppDispatch()
  const { personDetail, isError, isLoading } = useAppSelector(state => state.personDetailReducer)

  useEffect(() => {
    dispatch(fetchDetailsPerson(id))
  }, [dispatch, id])

  return (
    <>
      { isLoading && <p>Loading...</p> }
      { isError && <p>{isError}</p> }

      <div className='container flex mx-auto pt-5 max-w-[960px]'>
        <div className='flex flex-col'>
          <img src={personDetail?.posterUrl} alt="poster" />
        </div>
        <div className='flex flex-col ml-[40px] max-w-[50%]'>
          <h1 className={classes.header}>{ personDetail?.nameRu }</h1>
          <div className={classes.origName}>{personDetail?.nameEn}</div>
          <div className='mt-[50px] text-[22px]'>О персоне</div>
          <div className='mt-[5px]'>Карьера: { personDetail?.profession }</div>
          <div className='mt-[5px]'>Рост: { personDetail?.growth }</div>
          <div className='mt-[5px]'>Дата рождения: { personDetail?.birthday } { personDetail?.age }лет </div>
          <div className='mt-[5px]'>Место рождения: { personDetail?.birthplace }</div>
          <div className='mt-[5px]'> Жанры: - </div>
        </div>
      </div>

    </>
  )
}
