interface Option {
	value: string;
	label: string;
}
interface SelectInputProps {
	name: string;
	label?: string;
	error?: string;
	register?: any;
	options: Option[];
	wrapperClass?: string;
}

const SelectInput = ({
	name,
	options,
	error,
	label,
	register,
	wrapperClass,
	...rest
}: SelectInputProps) => {
	return (
		<div className={wrapperClass}>
			{label && <label htmlFor={name}>{label}</label>}

			<select
				className="form-select mt-1 w-full rounded-lg border-green-500 focus:ring-green-600"
				id={label}
				aria-invalid={error ? "true" : "false"}
				{...register(name)}
				{...rest}
			>
				{options.map((option) => (
					<option value={option.value} key={option.label}>
						{option.label}
					</option>
				))}
			</select>
			{error && (
				<span role="alert" className="text-sm text-red-500">
					{error}
				</span>
			)}
		</div>
	);
};

export default SelectInput;
