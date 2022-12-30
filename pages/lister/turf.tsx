import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { useForm , SubmitHandler } from "react-hook-form";
import { Button, Navbar } from "../../components";
import { FormUIType1, TurfProfileSchema, TurfProfileType } from "../../types/types";
import { toast, Toaster } from "react-hot-toast";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Database } from "../../types/database.types";


const Turfs = () => {

	const FormData: FormUIType1[] = [
		{
			label:"turfName",
			name:"turfname",
			type:"text",
			placeholder:" Turf Name "
		},
		{
			label:"Location",
			name:"location",
			type:"text",
			placeholder:" Location "
		},
		{
			label:"pricePerHour",
			name:"priceperhour",
			type:"number",
			placeholder:" Price Per Hour "
		},
		{
			label:"Capacity",
			name:"capacity",
			type:"number",
			placeholder:" Capacity "
		},
		{
			label:"Availability",
			name:"availability",
			type:"checkbox",
			placeholder:" Availability "

		},
	]
	const supabase = useSupabaseClient<Database>();
	const user =useUser()
	
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
				turf_name : info.turfname,
				location : info.location,
				price_per_hour : info.priceperhour,
				capacity : info.capacity,
				availability : info.availability
			})
			.select()

		
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

					{
						FormData.map((data)=>(
							<>
							<div key={data.name}>
								<label htmlFor={data.label} className="pb-2 text-sm">
									{data.name} { "" }
									<span className="font-bold text-red-900">*</span>
								</label>
								<input 
								type={data.type}
								placeholder={data.placeholder}
								className="inputCss"
					
								/>

							</div>
							{errors[data.name] && <p>{errors[data.name].message}</p>}
							</>
						))
					}
					<Button text="Enter listing " isSubmitting={isSubmitting} />
					</form>
				</div>
			</main>
		</>
	);
};

export default Turfs;
