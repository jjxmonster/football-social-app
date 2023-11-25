import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Providers } from "./providers";
import classNames from "classnames";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Football App",
	description: "...",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={classNames(inter.className, ["bg-gray-900"])}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
