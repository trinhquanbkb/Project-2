import React, { ChangeEvent } from 'react'

interface IFormInput {
	id: string
	name: string
	label: string
	type: string
	required: boolean
	value?: any
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function FormInput({
	id,
	name,
	type,
	label,
	required,
	value,
	onChange
}: IFormInput) {
	return (
		<div>
			<label htmlFor={id} className="label-form">
				{label}
				{required === true ? (
					<span className="text-danger">*</span>
				) : null}
			</label>
			<br />
			<input
				type={type}
				className="input-text required-entry input-form"
				id={id}
				name={name}
				autoComplete="off"
				onChange={onChange}
				value={value === undefined ? null : value}
			/>
		</div>
	)
}
