import React from 'react'
import { IReviews } from '../../models/IMovieModels'
import classes from './reviews.module.css'
import { formatDate, convertMinutesToHours } from '../../utils/formatter'

interface IReviewsProp {
  reviews: IReviews
}

export function Reviews({reviews}: IReviewsProp ) {

  let reviewClass = classes.reviewContainer

  if (reviews.type === 'POSITIVE') {
    reviewClass = `${reviewClass} ${classes.goodReview}`;
  } else if (reviews.type === 'NEGATIVE') {
    reviewClass = `${reviewClass} ${classes.negativeReview}`;
  }

  const reviewTime = reviews.date.split('T')[1]

  console.log(reviewTime)

  return (
    <div className={reviewClass}>
      <div className='flex justify-between px-4 py-4 border-b-2'>
        <div>
          { reviews.author }
        </div>
        <div>
          { formatDate(String(reviews.date)) } в {convertMinutesToHours(Number(reviewTime))}
        </div>
      </div>
      <div className='flex flex-col px-4 py-4'>
        <h2 className='pb-[10px] text-[18px] font-medium'> { reviews.title } </h2>
        <div className='text-[14px]' dangerouslySetInnerHTML={{ __html: reviews.description }}></div>
      </div>
      <div className='flex justify-end pb-[25px] mr-[15px]'>
        <button className='inline-flex py-2 px-4 justify-center items-center bg-opacity-5 bg-black rounded-[30px] hover:scale-105 hover:bg-opacity-10 transition-all'>
          <span className={classes.like}></span>
          <span className='ml-[5px]'>Полезно</span>
          <span className='ml-[5px]'> { reviews.positiveRating } </span>
        </button>
        <button className='inline-flex justify-center items-center py-2 px-4 bg-opacity-5 bg-black rounded-[30px] ml-[15px] hover:scale-105 hover:bg-opacity-10 transition-all'>
          <span className={classes.deslike}></span>
          <span className='ml-[5px]'>Нет</span>
          <span className='ml-[5px]'> { reviews.negativeRating } </span>
        </button>
      </div>
    </div>
  )
}
