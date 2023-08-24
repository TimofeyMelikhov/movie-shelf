import React, { useState } from 'react'
import { IFacts } from '../../../models/IMovieModels'

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
				<div className='cursor-pointer' onClick={showMoreItems}> Показать еще </div>
			)}
		</div>
  )
}
