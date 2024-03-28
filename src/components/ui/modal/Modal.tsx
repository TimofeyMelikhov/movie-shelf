import cn from 'clsx'
import { ReactNode } from 'react'

import classes from './modal.module.scss'

interface IModalProps {
	active: boolean
	setActive: React.Dispatch<React.SetStateAction<boolean>>
	children: ReactNode
}

export const Modal = ({ active, setActive, children }: IModalProps) => {
	return (
		<div
			className={cn(classes.modal, {
				[classes.active]: active
			})}
		>
			<div className={classes.modal__content}>
				<div
					className={classes.modal__close}
					onClick={() => setActive(false)}
				/>
				{children}
			</div>
		</div>
	)
}
