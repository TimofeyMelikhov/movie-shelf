import React, { useState } from 'react'
import { IFacts } from '../../../models/IMovieModels'
import classes from './facts.module.css'

interface IFactsProp {
	facts?: IFacts[]
}

export const Facts: React.FC<IFactsProp> = ({facts}) => {

	const itemsPerPage = 5;
	const [visibleItems, setVisibleItems] = useState(itemsPerPage);

	const showMoreItems = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + itemsPerPage);
  };

	const listFacts = facts?.slice(0, visibleItems).map((fact, index) => (
		<div
			key={index}
			dangerouslySetInnerHTML={{ __html: fact.text }}
			className="border-b-2 mt-[25px] pb-[15px]"
		></div>
	))

  return (
		
    <div>
			{ listFacts }
			{ facts && visibleItems < facts?.length && (
				<button className='bg-black bg-opacity-5 rounded-[100px] text-[15px] mt-[15px] px-[14px] py-[4px] hover:scale-105' onClick={showMoreItems}> 
					<span className={classes.factsButton}> Показать еще </span>
				</button>
			)}
		</div>
  )
}
