"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Textarea } from "@nextui-org/input";
import { profileSetupFormItems } from "@/lib/constants";
import { SubmitButton } from "@/components/common/submit-button";
import { profileSetupFormSchema } from "@/lib/utils";
import type { ProfileSetupInputs, TeamDetails } from "@/lib/types";
import { Select, SelectItem } from "@nextui-org/select";
import type { Session } from "next-auth";
import { checkUsername, updateUserProfile } from "@/app/actions";

interface ProfileSetupFormProps {
	teams: TeamDetails[];
	session: Session;
}

export const ProfileSetupForm = ({
	teams,
	session: { accessToken },
}: ProfileSetupFormProps) => {
	const {
		handleSubmit,
		control,
		setError,
		formState: { errors },
	} = useForm<ProfileSetupInputs>({
		resolver: zodResolver(profileSetupFormSchema),
		mode: "onBlur",
	});

	const renderItems = profileSetupFormItems.map(
		({ key, label, placeholder, type }) => {
			return (
				<Controller
					key={key}
					control={control}
					name={key}
					render={({ field }) => {
						switch (key) {
							case "favouriteTeam":
								return (
									<Select
										label={label}
										placeholder={placeholder}
										selectionMode="multiple"
										color="default"
										{...field}
									>
										{teams.map((team) => (
											<SelectItem key={team.id} value={team.id}>
												{team.name}
											</SelectItem>
										))}
									</Select>
								);

							case "description":
								return (
									<Textarea
										isInvalid={!!errors[key]}
										label={label}
										autoComplete="off"
										type={type}
										placeholder={undefined}
										errorMessage={(errors[key]?.message as string) ?? null}
										{...field}
									/>
								);

							default:
								return (
									<Input
										isInvalid={!!errors[key]}
										label={label}
										autoComplete="off"
										type={type}
										placeholder={undefined}
										errorMessage={(errors[key]?.message as string) ?? null}
										{...field}
									/>
								);
						}
					}}
				/>
			);
		},
	);

	const processForm = async (data: ProfileSetupInputs) => {
		const { name } = data;
		const checkUserNameRes = await checkUsername(name, accessToken);

		if (checkUserNameRes && checkUserNameRes.exists) {
			setError("name", { message: "Uzytkownik o takiej nazwie juz istnieje" });
			return;
		}

		await updateUserProfile(data, accessToken);
	};

	return (
		<form
			onSubmit={handleSubmit(processForm)}
			className="mt-5 flex flex-col gap-5 md:min-w-[400px]"
			autoComplete="off"
		>
			<div className="space-y-3">{renderItems}</div>
			<SubmitButton label="Zapisz" />
		</form>
	);
};
