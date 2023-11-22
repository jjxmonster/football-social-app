"use server";

import { registerFormSchema } from "@/lib/utils";
import { postLogin, postRegister } from "../data/user";
import {
	RegisterActionStatus,
	type ResponseData,
	type ActionResponse,
	type LoginInputs,
	type RegisterInputs,
	type UserDetails,
} from "@/lib/types";

export const loginAction = async (
	formData: LoginInputs,
): Promise<
	ActionResponse<{
		token: string;
		userData: UserDetails;
	}>
> => {
	try {
		const response = await postLogin(formData);
		const data = (await response.json()) as ResponseData<{
			token: string;
			userData: UserDetails;
		}>;

		switch (data.status) {
			case 200:
				return {
					error: false,
					status: RegisterActionStatus.SUCCESS,
					data: data.data,
				};
			case 403:
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
