import type { LoginInputs, RegisterInputs, UserDetails } from "@/lib/types";

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
	return fetch(`${process.env.API}/auth/activate/${key}`, {
		cache: "no-store",
	});
};

export const patchProfileSetup = async (
	payload: Pick<UserDetails, "name" | "description" | "favouriteTeam">,
	token: string,
) => {
	const { name, description, favouriteTeam } = payload;

	return fetch(`${process.env.API}/user`, {
		method: "PATCH",
		body: JSON.stringify({
			name,
			description: description ?? null,
			favoriteTeam: favouriteTeam ?? null,
		}),
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		cache: "no-store",
	});
};
