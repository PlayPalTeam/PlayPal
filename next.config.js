/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	modularizeImports: {
		"src/components": {
			transform: "src/components/{{member}}",
		},
	},
};

module.exports = nextConfig;
