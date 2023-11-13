import { collections } from './collectionsData'
import { ElementList } from './list/ElementList'
import classes from './listsOfCollections.module.css'

export function Series() {
	return (
		<div className={classes.main_container}>
			<div className={classes.movie_container}>
				{collections.map(el => (
					<ElementList
						key={el.id}
						title={el.title}
						pictures={el.pictures}
						total={el.total}
						typeCollection={el.typeCollection}
					/>
				))}
			</div>
		</div>
	)
}
