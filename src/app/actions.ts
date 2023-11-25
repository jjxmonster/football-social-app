"use server";

import { registerFormSchema } from "@/lib/utils";
import { patchProfileSetup, postLogin, postRegister } from "../data/mutations";
import {
	RegisterActionStatus,
	type ResponseData,
	type ActionResponse,
	type LoginInputs,
	type RegisterInputs,
	type UserDetails,
} from "@/lib/types";
import { getUsernameExists } from "@/data/queries";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

export const authorizeUser = async ({ email, password }: LoginInputs) => {
	const response = await postLogin({ email, password });

	const data = (await response.json()) as ResponseData<{
		token: string;
		userData: UserDetails;
	}>;
	console.log(data, "AUTH DATA");
	if (data.status === 200) {
		return {
			userData: data.data.userData,
			token: data.data.token,
		};
	}

	return null;
};

export const registerAction = async (
	formData: RegisterInputs,
): Promise<ActionResponse<null>> => {
	const result = registerFormSchema.safeParse(formData);

	if (!result.success) {
		return {
			error: true,
			message: "Invalid form data.",
			status: RegisterActionStatus.ERROR,
		};
	}

	try {
		const response = await postRegister(formData);
		const data = (await response.json()) as ResponseData<null>;

		switch (data.status) {
			case 200:
				return { error: false, status: RegisterActionStatus.SUCCESS };
			case 400:
				return {
					error: true,
					message: data.message,
					status: RegisterActionStatus.ERROR,
				};
		}
	} catch (e) {
		return {
			error: true,
			message: "Something went wrong.",
			status: RegisterActionStatus.ERROR,
		};
	}

	return {
		error: true,
		message: "Something went wrong.",
		status: RegisterActionStatus.ERROR,
	};
};

export const checkUsername = async (username: string, token: string) => {
	const response = await getUsernameExists(username, token);
	const data = (await response.json()) as ResponseData<{ exists: boolean }>;

	if (data.status === 200) {
		return data.data;
	}

	return null;
};

export const updateUserProfile = async (
	payload: Pick<UserDetails, "name" | "description" | "favouriteTeam">,
	token: string,
) => {
	const response = await patchProfileSetup(payload, token);

	const data = (await response.json()) as ResponseData<UserDetails>;

	if (data.status === 200) {
		revalidateTag("user");
		redirect("/");
	}

	return null;
};
