import { Outlet } from 'react-router-dom'

import { Menu } from '../menu/Menu'
import { Navigation } from '../navbar/Navigation'

export const Layout = () => {
	return (
		<>
			<Navigation />
			<Outlet />
		</>
	)
}
