import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { useForm, SubmitHandler } from "react-hook-form";
import {  Button, Navbar } from "../../../src/components";
import {
	TurfFormProps,
	TurfProfileSchema,
	TurfProfileType,
} from "../../../src/types/types";
import { useTurfContext } from "../../../src/context/TurfContext";
import toast, { Toaster } from "react-hot-toast";
import Avatar1 from "../../../src/components/Avatar1";



const Turfs = () => {
	const { addTurf } = useTurfContext();

	const FormData: TurfFormProps[] = [
		{
			label: "turfName",
			name: "turf_name",
			type: "text",
			placeholder: "Turf Name",
			val: false,
		},
		{
			label: "Location",
			name: "location",
			type: "text",
			placeholder: "Location",
			val: false,
		},
		{
			label: "pricePerHour",
			name: "price_per_hour",
			type: "number",
			placeholder: "Price Per Hour",
			val: true,
		},
		{
			label: "Capacity",
			name: "capacity",
			type: "number",
			placeholder: "Capacity",
			val: true,
		},
		{
			label: "Description",
			name: "description",
			type: "text",
			placeholder: "Description",
			val: false,
		},
	];

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<TurfProfileType>({
		resolver: zodResolver(TurfProfileSchema),
	});

	const onSubmit: SubmitHandler<TurfProfileType> = (info) => {
		toast.promise(addTurf(info), {
			loading: `Adding turf ${info.turf_name}`,
			success: `Added turf ${info.turf_name}`,
			error: "Something went wrong",
		});
		reset();
	};

	return (
		<>
			<Head>
				<title>Add Turfs</title>
			</Head>
			<main className="flex">
				<Toaster />
				<Navbar />
				<div className="p-14">
					<div className="flex rounded-lg border border-green-500">
						<Avatar1 navs={true} />
					</div>
					<form onSubmit={handleSubmit(onSubmit)}>
						{FormData.map((data) => (
							<>
								<div key={data.label}>
									<label htmlFor={data.name} className="pb-2 text-sm">
										{data.label} {""}
										<span className="font-bold text-red-900">*</span>
									</label>
									<input
										type={data.type}
										placeholder={data.placeholder}
										className="inputCss"
										{...register(data.name, { valueAsNumber: data.val })}
									/>
								</div>
								{errors[data.name] && <p>{errors[data.name].message}</p>}
							</>
						))}
						<Button
							type="submit"
							text="Enter listing "
							isSubmitting={isSubmitting}
						/>
					</form>
				</div>
			</main>
		</>
	);
};

export default Turfs;
