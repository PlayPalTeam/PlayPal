import { createContext, ReactNode, useContext } from "react";
import useSupabaseData from "../hooks/use-supabase-database";
import { Database } from "../types/database.types";

type Turf = Database["public"]["Tables"]["turfs"]["Row"];

interface TurfContextType {
	turfs: Turf[];
	addTurf: (data: Turf) => Promise<void>;
	updateTurf: (id: string, data: Turf) => Promise<void>;
	deleteTurf: (id: string) => Promise<void>;
}

export const TurfContext = createContext<TurfContextType>({
	turfs: [],
	addTurf: () => Promise.resolve(),
	updateTurf: () => Promise.resolve(),
	deleteTurf: () => Promise.resolve(),
});

export const TurfProvider = ({ children }: { children: ReactNode }) => {
	const { data, insertData, updateData, deleteData } =
		useSupabaseData<Turf>("turfs");

	return (
		<TurfContext.Provider
			value={{
				turfs: data,
				addTurf: insertData,
				updateTurf: updateData,
				deleteTurf: deleteData,
			}}
		>
			{children}
		</TurfContext.Provider>
	);
};

export const useTurfContext = () => {
	return useContext<TurfContextType>(TurfContext);
};
