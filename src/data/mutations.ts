import type { LoginInputs, RegisterInputs } from "@/lib/types";

export const postRegister = async (data: RegisterInputs) => {
	const { email, password } = data;
	return fetch(`${process.env.API}/auth/signup`, {
		method: "POST",
		body: JSON.stringify({
			email,
			password,
		}),
		headers: {
			"Content-Type": "application/json",
		},
		cache: "no-store",
	});
};

export const postLogin = async (data: LoginInputs) => {
	const { email, password } = data;
	return fetch(`${process.env.API}/auth/signin`, {
		method: "POST",
		body: JSON.stringify({
			email,
			password,
		}),
		headers: {
			"Content-Type": "application/json",
		},
		cache: "no-store",
	});
};

export const postActiveUser = async (key: string) => {
	return fetch(`${process.env.API}/user/activate/${key}`, {
		cache: "no-cache",
	});
};
