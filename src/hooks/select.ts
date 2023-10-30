import { Dispatch, FormEvent, useState } from 'react'

interface ISelectReturn {
	value: string
	onChange: (event: FormEvent<HTMLSelectElement>) => void
	setValue: Dispatch<string>
}

export function useSelect(initialValue = ''): ISelectReturn {
	const [value, setValue] = useState(initialValue)

	const onChange = (event: FormEvent<HTMLSelectElement>) => {
		setValue(event.currentTarget.value)
	}

	return {
		value,
		onChange,
		setValue
	}
}
