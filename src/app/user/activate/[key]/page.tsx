"use server";

import { Check, XCircle } from "lucide-react";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import type { ResponseData } from "@/lib/types";

export default async function Activate({
	params,
}: {
	params: { key: string };
}) {
	const res = await fetch(`${process.env.API}/user/activate/${params.key}`, {
		cache: "no-cache",
	});
	const data = (await res.json()) as ResponseData;

	const renderMessage = () => {
		switch (data.status) {
			case 200:
				return (
					<>
						<Check color="green" size={50} />
						<span className="text-xl text-white ">
							Twoje konto zostało aktywowane!
						</span>
						<Button href="/login" as={Link} color="primary">
							Zaloguj się
						</Button>
					</>
				);
			case 400:
				return (
					<>
						<XCircle color="red" size={50} />
						<span className="text-xl text-white">
							Kod aktywacyjny jest niepoprawny
						</span>
					</>
				);
			case 401:
				return (
					<>
						<span className="text-xl text-white">
							Konto zostało już aktywowane
						</span>
						<Button href="/login" as={Link} color="primary">
							Zaloguj się
						</Button>
					</>
				);
			case 500:
				return (
					<>
						<XCircle color="red" size={50} />
						<span className="text-xl text-white">
							Coś poszło nie tak, spróbuj ponownie później.
						</span>
					</>
				);
		}
	};

	return (
		<main className="flex h-screen w-full flex-col items-center justify-center gap-5 bg-gray-900">
			{renderMessage()}
		</main>
	);
}
