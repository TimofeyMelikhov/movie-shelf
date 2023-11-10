import classes from './ElementList.module.css'

interface IElemProps {
	title: string
	pictures: string
	total: number
}

export const ElementList = ({ title, pictures, total }: IElemProps) => {
	const moviesWatchedCount = 0

	return (
		<div className={classes.container}>
			<div className='flex'>
				<div className='mr-[15px]'>
					<img src={pictures} alt='image top' />
				</div>
				<div>
					<h2 className='font-bold'>{title}</h2>
					<p className='font-light'>{total} фильмов</p>
				</div>
				<div className='ml-[300px] font-light'>
					<p>
						{moviesWatchedCount} из {total}
					</p>
				</div>
			</div>
		</div>
	)
}
