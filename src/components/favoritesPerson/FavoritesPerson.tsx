import React from 'react'
import { IPersonDetail } from '../../models/IMovieModels'
import { formatDate } from '../../utils/formatter'
import { useNavigate } from 'react-router-dom'

interface personProp {
  person: IPersonDetail
}

export function FavoritesPerson({person}: personProp) {

  const navigate = useNavigate()

  const clickHandler = () => {
    navigate(`/name/${person.personId}`)
  }

  return (
    <div className='flex text-[16px] mb-[10px]'>
      <div>
        <img src={person.posterUrl} style={{width: '62px'}} alt={person.nameRu} />
      </div>
      <div className='flex flex-col text-start ml-[15px]'>
        <p 
          onClick={clickHandler}
          className='cursor-pointer hover:text-active_staff_link'
        > 
        { person.nameRu }
         </p>
        <p className='text-gray-400 text-[14px]'> { person.nameEn } </p>
        <p> { formatDate(String(person.birthday)) } • { person.age } лет </p>
      </div>
    </div>
  )
}
