import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Form, Navbar } from "../../../src/components";
import {
	TurfFormProps,
	TurfProfileSchema,
	TurfProfileType,
} from "../../../src/types/types";
import { useTurfContext } from "../../../src/context/TurfContext";
import toast, { Toaster } from "react-hot-toast";
import { BaseSyntheticEvent, useState } from "react";

const Turfs = () => {
	const { addTurf } = useTurfContext();

	const FormData: TurfFormProps[] = [
		{
			label: "turfName",
			name: "turf_name",
			type: "text",
			placeholder: "Turf Name",
		},
		{
			label: "Daytime",
			name: "daytime",
			type: "text",
			placeholder: "Daily Availabel Period",
		},
		{
			label: "Location",
			name: "location",
			type: "text",
			placeholder: "Location",
		},
	
		
		{
			label: "Ammenitites",
			name: "ammenitites",
			type: "text",
			placeholder: "Ammenitites",
		},

		{
			label: "pricePerHour",
			name: "price_per_hour",
			type: "number",
			placeholder: "Price Per Hour",
			valueAsNumber: true,
		},
		{
			label: "Capacity",
			name: "capacity",
			type: "number",
			placeholder: "Capacity",
			valueAsNumber: true,
		},
		{
			label: "Venuerules",
			name: "venuerules",
			type: "text",
			placeholder: "Venue Rules",
		},
		{
			label: "ShortLocation",
			name: "shortlocation",
			type: "text",
			placeholder: "Short Location",
		},

		{
			label: "Description",
			name: "description",
			type: "text",
			placeholder: "Description",
		},
		{
			label: "AvailabelSports",
			name: "availabelsports",
			type: "select",
			placeholder: "Availabel Sports",
			options: [{value:"boxcricket" ,label:"BoxCricket"},{value:"badminton" ,label:"BadMinton"}
		 ,{value:"tennis" ,label:"Tennis"}]
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

	


	const [sportSelection, setSportSelection] = useState< string[] >([]);

	const handleChange = (e) => {
		console.log(e.target.value);
		setSportSelection((prev)=>(
			[ ...prev , e.target.value]
		))
				
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
						{/* <Avatar1 navs={true} /> */}
					</div>
					<Form formFields={
						FormData
					} onSubmit={onSubmit} form={"Listing"} buttonType={"submit"} buttonText={"Enter Listing"}					
					/>
					{ sportSelection.map((data)=>(
						<li>{data}</li>
					))}
				</div>

			</main>
		</>
	);
};

export default Turfs;
