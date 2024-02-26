import { useNavigate } from 'react-router-dom'

import classes from './ElementList.module.css'

interface IElemProps {
	title: string
	pictures: string
	total: number
	typeCollection: string
}

export const ElementList = ({
	title,
	pictures,
	total,
	typeCollection
}: IElemProps) => {
	const moviesWatchedCount = 0

	const navigate = useNavigate()

	const clickHandler = () => {
		navigate(`/collections/${typeCollection}`)
	}

	return (
		<div className={classes.container} onClick={clickHandler}>
			<div className='flex justify-between'>
				<div className='flex'>
					<img src={pictures} className='w-[88px]' alt='image top' />
					<div className='flex flex-col items-center ml-[15px]'>
						<h2 className='font-bold'>{title}</h2>
						<p className='font-light'>{total} фильмов</p>
					</div>
				</div>

				<div className='flex ml-[300px] font-light'>
					<p>
						{moviesWatchedCount} из {total}
					</p>
				</div>
			</div>
		</div>
	)
}
