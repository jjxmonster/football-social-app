import { Button } from "@nextui-org/button";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
	label: string;
}

export const SubmitButton = ({ label }: SubmitButtonProps) => {
	const { pending } = useFormStatus();

	return (
		<Button disabled={pending} type="submit" color="primary">
			{label}
		</Button>
	);
};
