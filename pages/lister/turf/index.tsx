import Button from "@components/Button"
import FormTitle from "@components/FormTitle"
import Input from "@components/Input"
import Layout from "@components/Layout"
import SelectInput from "@components/SelectInput"
import { useTurfContext } from "@context/TurfContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import toast from "react-hot-toast"
import { TurfProfileSchema, TurfProfileType } from "src/types/types"

const Ammenoptions = [{ value: "", label: "Select Turf Amenities" }, { value: "Gym", label: "Gym" }, { value: "Free WiFi", label: "Free WiFi" }, { value: "Pool", label: "Pool" }]

const SportsOption = [{ value: "", label: "Select Turf Sports" }, { value: "boxcricket", label: "BoxCricket" }, { value: "badminton", label: "BadMinton" }
	, { value: "tennis", label: "Tennis" }]

export default function Turf() {

	const { addTurf } = useTurfContext()

	const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
		resolver: zodResolver(TurfProfileSchema)
	})

	const Submit: SubmitHandler<TurfProfileType> = async (turf) => {
		toast.promise(addTurf(turf), { loading: "L", success: "S", error: "E" })
	}

	return (
		<Layout title="Add Turf">
			<main className="max-w-4xl m-auto">
				<div className="shadow-md shadow-green-300 p-5 rounded-2xl">
					<form className="space-y-5" onSubmit={handleSubmit(Submit)}>
						<FormTitle title="Add Your Turf" />
						<Input errors={errors} label="Name" name="turf_name" register={register} type={"text"} placeholder={"Enter your place name"} />
						<div className="flex gap-5">
							<Input errors={errors} label="Opening Hours" name="opening_hours" register={register} type={"time"} placeholder={"Enter your place name"} className="w-44" />
							<Input errors={errors} label="Ending Hours" name="ending_hours" register={register} type={"time"} placeholder={"Enter your place name"} className="w-44" />
						</div>
						<Input errors={errors} label="Address" name="location" register={register} type={"text"} placeholder={"Enter your place address"} />
						<div className="flex gap-5">
							<Input errors={errors} label="Price" name="price_per_hour" register={register} type={"text"} placeholder={"Enter your place price per hour"} valueAsNumber={true} />
							<Input errors={errors} label="Capacity" name="capacity" register={register} type={"text"} placeholder={"Enter your place capacity"} valueAsNumber={true} />
						</div>
						<div>
							<label htmlFor="desc">Description</label>
							<textarea autoComplete="true" className="resize-none inputCss" {...register("description")} id="desc" name="description" />
						</div>
						<div>
							<label htmlFor="rule">Rules</label>
							<textarea autoComplete="true" className="resize-none inputCss" {...register("venuerules")} name="rule" />
						</div>
						<SelectInput multiple={true} label="Amenities" name="amenities" options={Ammenoptions} register={register} errors={errors} />
						<SelectInput multiple={true} label="Sports" name="sports" options={SportsOption} register={register} errors={errors} />
						<Button type="submit" text="Add turf" isSubmitting={isSubmitting} />
					</form>
				</div >
			</main >
		</Layout >
	)
}