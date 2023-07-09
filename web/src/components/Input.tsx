import { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function Input(props: InputProps) {
  const { register } = useFormContext()

  return (
    <label className="flex flex-col gap-1" htmlFor={props.name}>
      <span className="font-medium text-gray-200">{props.label}</span>
      <input
        className="h-12 rounded-lg border border-app-100 bg-app-500 px-4 text-sm placeholder:text-gray-400 focus:outline-0 focus:ring-1 focus:ring-app-100"
        {...props}
        {...register(props.name)}
      />
    </label>
  )
}
