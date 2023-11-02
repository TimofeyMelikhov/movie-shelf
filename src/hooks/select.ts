import { SelectChangeEvent } from '@mui/material/Select'
import { Dispatch, useState } from 'react'

interface ISelectReturn {
	value: string
	onChange: (event: SelectChangeEvent<string>) => void
	setValue: Dispatch<string>
}

export function useSelect(initialValue = ''): ISelectReturn {
	const [value, setValue] = useState(initialValue)

	const onChange = (event: SelectChangeEvent<string>) => {
		setValue(event.target.value)
	}

	return {
		value,
		onChange,
		setValue
	}
}
