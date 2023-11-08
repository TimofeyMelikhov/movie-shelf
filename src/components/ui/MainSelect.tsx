import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent
} from '@mui/material'

import { IFilters } from '../../models/IMovieModels'

interface ISelectProps {
	title: string
	titleId: string
	labelId: string
	id: string
	label: string
	value: string
	onChange: (event: SelectChangeEvent<string>) => void
	data: { id: number; options: string }[]
}

export const MainSelect = ({
	title,
	titleId,
	labelId,
	id,
	label,
	value,
	onChange,
	data
}: ISelectProps) => {
	return (
		<div>
			<FormControl fullWidth className='flex'>
				<InputLabel id={titleId}> {title} </InputLabel>
				<Select
					labelId={labelId}
					id={id}
					label={label}
					value={value}
					onChange={onChange}
				>
					<MenuItem value=''>—</MenuItem>
					{data.map(item => (
						<MenuItem key={item.id} value={item.id}>
							{item.options}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	)
}
