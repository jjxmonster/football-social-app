import type * as z from "zod";
import type {
	loginFormSchema,
	profileSetupFormSchema,
	registerFormSchema,
} from "./utils";

export type ActionState = {
	message?: string;
	status: RegisterActionStatus;
};

export enum RegisterActionStatus {
	SUCCESS = "SUCCESS",
	ERROR = "ERROR",
}
export type UserDetails = {
	id: string;
	avatarUrl?: string;
	description?: string;
	favouriteTeam?: string;
	isProfileCompleted: boolean;
	name?: string;
};
export type TeamDetails = {
	id: string;
	name: string;
};
export type ResponseData<T> = {
	status: number;
	message: string;
	data: T;
};
export type ActionResponse<T> = {
	error: boolean;
	message?: string;
	status: RegisterActionStatus;
	data?: T;
};

export type RegisterInputs = z.infer<typeof registerFormSchema>;
export type LoginInputs = z.infer<typeof loginFormSchema>;
export type ProfileSetupInputs = z.infer<typeof profileSetupFormSchema>;
