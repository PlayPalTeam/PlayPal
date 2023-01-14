import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormContent, RequestData, RequestSchema } from "../types/types";
import { Toaster } from "react-hot-toast";
import { useRequestContext } from "../context/RequestContext";
import { useBookContext } from "../context/BookingContext";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "./Button";

interface Props {
	isOpen: boolean;
	closeModal: () => void;
}

const RequestForm = ({ closeModal, isOpen }: Props) => {
	const { addRequest } = useRequestContext();
	const { books } = useBookContext();

	const {
		reset,
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
		watch,
	} = useForm<RequestData>({
		resolver: zodResolver(RequestSchema),
	});

	const turf_id = watch("turf_id");

	const names_of_turf = useMemo(() => {
		const uniqueIds = Array.from(new Set(books.map((book) => book.turf_id)));
		return uniqueIds.map((id) => {
			const turf = books.find((book) => book.turf_id === id);
			return { value: id, label: turf.turfs.turf_name };
		});
	}, [books]);

	const dates = useMemo(() => {
		const filteredBooks = books.filter((book) => book.turf_id === turf_id);
		return filteredBooks.map((book) => {
			return { value: book.date, label: book.date };
		});
	}, [books, turf_id]);

	const createRequestFormContent = (
		turfs: FormContent["options"],
		dates: FormContent["options"]
	): FormContent[] => {
		return [
			{
				label: "Turf",
				name: "turf_id",
				type: "select",
				options: turfs,
			},
			{
				label: "Date",
				name: "game_date",
				type: "select",
				options: dates,
			},
			{
				label: "Player Needed",
				type: "text",
				name: "player_needed",
				valueAsNumber: true,
			},
			{
				label: "Sports type",
				type: "text",
				name: "game",
			},
		];
	};

	const RequestFormContent = useMemo(
		() => createRequestFormContent(names_of_turf, dates),
		[dates, names_of_turf]
	);

	const onSubmit: SubmitHandler<RequestData> = async (formData) => {
		console.log(JSON.stringify(formData, null, 2));
		addRequest(formData);
		reset();
		closeModal();
	};

	return (
		<>
			<Toaster />
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-center text-lg font-medium leading-6 text-gray-900"
									>
										Request For Player
									</Dialog.Title>
									<div className="mt-2">
										<form
											className="space-y-5"
											onSubmit={handleSubmit(onSubmit)}
										>
											{RequestFormContent.map((field, index) => (
												<div key={index} className="form-group">
													<label htmlFor={field.name}>{field.label}</label>
													{field.type === "select" ? (
														<select
															className="inputCss"
															id={field.name}
															name={field.name}
															{...register(field.name)}
														>
															{field.options?.map((option, index) => (
																<option key={index} value={option.value}>
																	{option.label}
																</option>
															))}
														</select>
													) : (
														<>
															<input
																type={field.type}
																className="inputCss"
																id={field.name}
																name={field.name}
																{...register(field.name, {
																	valueAsNumber: field.valueAsNumber,
																})}
															/>
															{errors[field.name] && (
																<p className="text-xs text-red-500">
																	{errors[field.name].message}
																</p>
															)}
														</>
													)}
												</div>
											))}
											<Button
												type="submit"
												text="Submit"
												isSubmitting={isSubmitting}
											/>
										</form>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default RequestForm;
