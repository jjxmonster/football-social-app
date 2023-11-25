import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/components/button.js",
		"./node_modules/@nextui-org/theme/dist/components/input.js",
		"./node_modules/@nextui-org/theme/dist/components/card.js",
		"./node_modules/@nextui-org/theme/dist/components/link.js",
		"./node_modules/@nextui-org/theme/dist/components/select.js",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				error: "#ff0033",
				success: "#4BB543",
			},
		},
	},
	plugins: [nextui()],
};
