import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent
} from '@mui/material'

interface ISelectProps {
	title: string
	titleId: string
	labelId: string
	id: string
	label: string
	value: string
	onChange: (event: SelectChangeEvent<string>) => void
	options: { id: number | string; options: string }[]
}

export const MainSelect = ({
	title,
	titleId,
	labelId,
	id,
	label,
	value,
	onChange,
	options
}: ISelectProps) => {
	return (
		<div className='w-[200px]'>
			<FormControl fullWidth className='flex'>
				<InputLabel id={titleId}> {title} </InputLabel>
				<Select
					labelId={labelId}
					id={id}
					label={label}
					value={value}
					onChange={onChange}
				>
					{options.map(item => (
						<MenuItem key={item.id} value={item.id}>
							{item.options}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	)
}
