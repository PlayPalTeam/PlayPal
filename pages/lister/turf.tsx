import { useTurfContext } from "../../context/TurfContext";

const Turfs = () => {
	const { TurfData } = useTurfContext();
	return <div>{JSON.stringify(TurfData, null, 2)}</div>;
};

export default Turfs;
