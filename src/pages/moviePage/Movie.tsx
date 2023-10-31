import { AdvancedSearch } from '../../components/advancedSearch/AdvancedSearch'

import classes from './movie.module.css'

export default function Movie() {
	return (
		<div className={classes.main_container}>
			<div className={classes.movie_container}>
				<div>
					<h2>Расширенный поиск</h2>
				</div>
				<AdvancedSearch />
			</div>
		</div>
	)
}
