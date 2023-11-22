import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Check } from "lucide-react";

export const SuccessCard = () => {
	return (
		<Card className="bg-transparent shadow-none">
			<CardHeader className="flex flex-col items-center justify-center">
				<Check size={50} color="green" />
				<h2 className="text-xl font-bold text-white">
					Rejestracja zakończona powodzeniem
				</h2>
			</CardHeader>
			<CardBody>
				<p className="text-m text-center text-white">
					Sprawdź swoją skrzynkę pocztową w celu aktywacji konta.
				</p>
			</CardBody>
		</Card>
	);
};
