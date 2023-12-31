import Image from "next/image";

export async function FormLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className="grid h-screen w-screen bg-gray-900 md:grid-cols-2">
			<aside className="hidden md:block">
				<div className="relative hidden h-full w-full opacity-30 md:block">
					<Image
						alt="ball with foot on it"
						layout="fill"
						objectFit="cover"
						src="/images/ball.jpg"
					/>
				</div>
			</aside>
			<aside className="relative flex items-center justify-center">
				{children}
			</aside>
		</main>
	);
}
