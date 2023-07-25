import React from 'react'
import classes from './personDetails.module.css'
import { useParams } from 'react-router-dom'
import { useGetDetailsPersonQuery } from '../../redux/movies.api'

export function PersonDetails() {

  const {id} = useParams<'id'>()

  const { data: personDetail, isLoading, isError } = useGetDetailsPersonQuery(id)

  return (
    <>
      { isLoading && <p>Loading...</p> }
      { isError && <p>{isError}</p> }

      <div className='container mx-auto p-5 max-w-[1024px] bg-white min-h-[100vh]'>
        <div className='flex'>
          <div className='flex flex-col'>
            <img src={personDetail?.posterUrl} alt="poster" />
          </div>
          <div className='flex flex-col ml-[40px]'>
            <h1 className={classes.header}>{ personDetail?.nameRu }</h1>
            <div className={classes.origName}>{personDetail?.nameEn}</div>
            <div className='mt-[50px] text-[22px]'>О персоне</div>
            <div className='mt-[5px]'>Карьера: { personDetail?.profession }</div>
            <div className='mt-[5px]'>Рост: { personDetail?.growth }</div>
            <div className='mt-[5px]'>Дата рождения: { personDetail?.birthday } { personDetail?.age }лет </div>
            <div className='mt-[5px]'>Место рождения: { personDetail?.birthplace }</div>
            <div className='mt-[5px]'>Жанры: - </div>
          </div>
        </div>
        <div className='mt-[30px]'>
          <h2> Знаете ли вы, что… </h2>
          {
            personDetail?.facts.map(f => <p className='mt-[7px] border-b-2'> {f} </p>)
          }
        </div>
      </div>

    </>
  )
}
