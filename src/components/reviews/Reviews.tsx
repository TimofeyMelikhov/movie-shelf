import React, { useState } from 'react'
import { IReviews } from '../../models/IMovieModels'
import classes from './reviews.module.css'
import { formatDate } from '../../utils/formatter'

interface IReviewsProp {
  reviews: IReviews
}

export function Reviews({reviews}: IReviewsProp ) {

  let reviewClass = classes.reviewContainer

  const [visible, setVisible] = useState(true)

  if (reviews.type === 'POSITIVE') {
    reviewClass = `${reviewClass} ${classes.goodReview}`;
  } else if (reviews.type === 'NEGATIVE') {
    reviewClass = `${reviewClass} ${classes.negativeReview}`;
  }

  if(visible) {
    reviewClass = `${reviewClass} ${classes.reviewContainerFull}`
  }

  const reviewTime = reviews.date.split('T')[1]

  const clickHandle = (event: React.MouseEvent) => {
    event.preventDefault()
    setVisible(false)
  }

  return (
    <div className={reviewClass}>
      <div className='flex justify-between px-4 py-4 border-b-2'>
        <div>
          { reviews.author }
        </div>
        <div>
          { formatDate(String(reviews.date)) } в {reviewTime}
        </div>
      </div>
      <div className='flex flex-col px-4 py-4'>
        <h2 className='pb-[10px] text-[18px] font-medium'> { reviews.title } </h2>
        <div className={visible ? classes.review : classes.reviewFull}>
          <span dangerouslySetInnerHTML={{ __html: reviews.description }}></span>
        </div>
        {visible &&
          <div className='mt-[16px] text-[13px] text-[#1f1f1fb3]'> 
            <button className='bg-[#1f1f1f1a] px-[2px] py-[1px] rounded-[2px]' onClick={clickHandle}>показать всю рецензию</button>
          </div>
        }
        <div className='flex justify-end mr-[15px] mt-[32px]'>
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
    </div>
  )
}
