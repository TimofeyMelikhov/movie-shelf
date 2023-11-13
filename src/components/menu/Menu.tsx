import { Link } from 'react-router-dom'

import classes from './menu.module.css'

export function Menu() {
	return (
		<div className={classes.main_container}>
			<div className='flex flex-col py-2 px-4'>
				<Link to='/'>Главная</Link>
				<Link to='/search'>Расширенный поиск</Link>
				<Link to='/collections'>Топы фильмов</Link>
			</div>
		</div>
	)
}
