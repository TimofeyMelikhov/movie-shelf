import { useAppSelector } from '../../hooks/redux'

import { FavoritesPerson } from '../../components/favoritesPerson/FavoritesPerson'

export function ProfilePage() {
	const favoritePersons = useAppSelector(state => state.favoritePerson)

	return (
		<div className='container m-auto'>
			<div className='text-center mt-[20px] text-xl'>
				Любимые звезды({favoritePersons.length})
				<div>
					{favoritePersons.map(p => (
						<FavoritesPerson key={p.personId} person={p} />
					))}
				</div>
			</div>
		</div>
	)
}
