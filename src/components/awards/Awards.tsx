import { IAwards } from '@/models/IMovieModels'

interface IAwardsProps {
	awards: IAwards
}

export const Awards = ({ awards }: IAwardsProps) => {
	return (
		<div>
			{awards.imageUrl && (
				<div>
					<div>{awards.name}</div>
					<div className='w-10'>
						{<img src={awards.imageUrl} alt='award' />}
					</div>
					<div>{awards.nominationName}</div>
					<div>{awards.year}</div>
				</div>
			)}
		</div>
	)
}
