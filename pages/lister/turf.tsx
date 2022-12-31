import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Navbar } from "../../components";
import {
	FormUIType1,
	TurfProfileSchema,
	TurfProfileType,
} from "../../src/types/types";
import { toast, Toaster } from "react-hot-toast";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Database } from "../../src/types/database.types";

const Turfs = () => {
	const FormData: FormUIType1[] = [
		{
			label: "turfName",
			name: "turf_name",
			type: "text",
			placeholder: " Turf Name ",
			val: false,
		},
		{
			label: "Location",
			name: "location",
			type: "text",
			placeholder: " Location ",
			val: false,
		},
		{
			label: "pricePerHour",
			name: "price_per_hour",
			type: "number",
			placeholder: " Price Per Hour ",
			val: true,
		},
		{
			label:"Capacity",
			name:"capacity",
			type:"number",
			placeholder:" Capacity ",
			val:true
		}
		,
		{
			label: "Availability",
			name: "availability",
			type: "checkbox",
			placeholder: " Availability ",
			val: false,
		},
	];
	const supabase = useSupabaseClient<Database>();
	const user = useUser();

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<TurfProfileType>({
		resolver: zodResolver(TurfProfileSchema),
	});

	const onSubmit:SubmitHandler<TurfProfileType>= async (info)=>{
		const {status , error } = await supabase
		.from("turfs")
		.insert({
				turf_name : info.turf_name,
				location : info.location,
				price_per_hour :info.price_per_hour,
				capacity : info.capacity,
				profile_id:user.id,
				availability : info.availability
			})
		
			if (error) {
				toast.success(error.message, {
					duration: 3000,
					style: {
						border: "1px solid red",
						color: "red",
					},
				});
			}
	
			if (status === 204) {
				toast.success("Your data is updated", {
					duration: 3000,
					style: {
						border: "1px solid green",
						color: "green",
					},
				});
			}
	}

	return (
		<>
			<Head>
				<title>Add Turfs</title>
			</Head>
			<main className="flex">
				<Toaster />
				<Navbar />
				<div className="p-14">
					<form onSubmit={handleSubmit(onSubmit)}>
						{FormData.map((data) => (
							<>
								<div key={data.name}>
									<label htmlFor={data.label} className="pb-2 text-sm">
										{data.name} {""}
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
						<Button text="Enter listing " isSubmitting={isSubmitting} />
					</form>
				</div>
			</main>
		</>
	);
};

export default Turfs;
