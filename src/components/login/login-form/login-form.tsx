"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/input";
import { loginFormItems } from "@/lib/constants";
import { SubmitButton } from "@/components/common/submit-button";
import { loginAction } from "@/app/actions";
import { loginFormSchema } from "@/lib/utils";
import type { LoginInputs } from "@/lib/types";
import { useState } from "react";
import { MessageCard } from "@/components/common/message-card";

export const LoginForm = () => {
	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<LoginInputs>({
		resolver: zodResolver(loginFormSchema),
		mode: "onBlur",
	});
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const renderItems = loginFormItems.map(({ key, label, type }) => (
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

	const processForm = async (data: LoginInputs) => {
		const res = await loginAction(data);

		console.log(res);
		if (res.error) {
			setErrorMessage(res.message!);
			return;
		}
		reset();
	};

	return (
		<form
			onSubmit={handleSubmit(processForm)}
			className="mt-5 flex flex-col gap-5 md:min-w-[400px]"
			autoComplete="off"
		>
			<div className="space-y-3">{renderItems}</div>
			<SubmitButton label="Login" />
			{errorMessage && (
				<MessageCard transparent type="error" message={errorMessage} />
			)}
		</form>
	);
};
