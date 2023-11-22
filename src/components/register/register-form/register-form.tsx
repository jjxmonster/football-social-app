"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/input";
import { registerFormItems } from "@/lib/constants";
import { SubmitButton } from "@/components/common/submit-button";
import { registerAction } from "@/app/actions";
import { MessageCard } from "@/components/common/message-card";
import { registerFormSchema } from "@/lib/utils";
import type { RegisterInputs } from "@/lib/types";

interface RegisterFormProps {
	setShowSuccess: Dispatch<SetStateAction<boolean>>;
}

export const RegisterForm = ({ setShowSuccess }: RegisterFormProps) => {
	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<RegisterInputs>({
		resolver: zodResolver(registerFormSchema),
		mode: "onBlur",
	});
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const renderItems = registerFormItems.map(({ key, label, type }) => (
		<Controller
			key={key}
			control={control}
			name={key}
			render={({ field }) => (
				<Input
					isInvalid={!!errors[key]}
					label={label}
					autoComplete="off"
					type={type}
					placeholder={undefined}
					errorMessage={(errors[key]?.message as string) ?? null}
					{...field}
				/>
			)}
		/>
	));

	const processForm: SubmitHandler<RegisterInputs> = async (data) => {
		const res = await registerAction(data);

		if (res.error) {
			setErrorMessage(res.message!);
			return;
		}

		setShowSuccess(true);
		reset();
	};

	return (
		<form
			onSubmit={handleSubmit(processForm)}
			className="mt-5 flex flex-col gap-5 md:min-w-[400px]"
			autoComplete="off"
		>
			<div className="space-y-3">{renderItems}</div>
			<SubmitButton label="Create Account" />
			{errorMessage && (
				<MessageCard transparent type="error" message={errorMessage} />
			)}
		</form>
	);
};
