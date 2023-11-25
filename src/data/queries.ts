import type { ResponseData, TeamDetails, UserDetails } from "@/lib/types";

export const getUserData = async (token: string) => {
	const response = await fetch(`${process.env.API}/user`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		cache: "no-store",
	});

	const data = (await response.json()) as ResponseData<UserDetails>;

	if (data.status === 200) {
		return data.data;
	}

	return null;
};

export const getAllTeams = async (token: string) => {
	const response = await fetch(`${process.env.API}/team/all`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		next: {
			tags: ["teams"],
		},
	});

	const data = (await response.json()) as ResponseData<TeamDetails[]>;

	if (data.status === 200) {
		return data.data;
	}

	return null;
};

export const getUsernameExists = async (username: string, token: string) => {
	return fetch(`${process.env.API}/user/check-name?name=${username}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		cache: "no-store",
	});
};
