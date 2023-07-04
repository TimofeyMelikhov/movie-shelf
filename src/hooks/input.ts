import { ChangeEvent, useState, Dispatch } from "react"

interface IInputReturn {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  setvalue: Dispatch<string>
}

export function useInput(initialValue = ''): IInputReturn {
  const [value, setValue] = useState(initialValue)

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return {
    value,
    onChange,
    setvalue: setValue
  }

}