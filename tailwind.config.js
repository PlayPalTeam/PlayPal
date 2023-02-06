/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			boxShadow: {
				card: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
			},
		},
	},
	plugins: [
		require("@tailwindcss/forms")({
			strategy: "class",
		}),
		require("@headlessui/tailwindcss")({ prefix: "ui" }),
		require("daisyui")
	],
	daisyui: {
		themes: ["night"]
	}
};
