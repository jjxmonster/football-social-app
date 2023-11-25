export const loginFormItems: {
	key: "email" | "password";
	type: string;
	label: string;
	placeholder: string;
}[] = [
	{
		key: "email",
		type: "email",
		label: "Email",
		placeholder: "johndoe@example.com",
	},
	{
		key: "password",
		type: "password",
		label: "Password",
		placeholder: "**********",
	},
];
export const registerFormItems: {
	key: "email" | "password" | "passwordConfirm";
	type: string;
	label: string;
	placeholder: string;
}[] = [
	{
		key: "email",
		type: "email",
		label: "Email",
		placeholder: "johndoe@example.com",
	},
	{
		key: "password",
		type: "password",
		label: "Password",
		placeholder: "**********",
	},
	{
		key: "passwordConfirm",
		type: "password",
		label: "Confirm Password",
		placeholder: "**********",
	},
];

export const profileSetupFormItems: {
	key: "name" | "description" | "favouriteTeam";
	type: string;
	label: string;
	placeholder: string;
}[] = [
	{
		key: "name",
		type: "text",
		label: "Nazwa użytkownika",
		placeholder: "johndoe",
	},
	{
		key: "description",
		type: "area",
		label: "Opis użytkownika (bio)",
		placeholder: "",
	},
	{
		key: "favouriteTeam",
		type: "text",
		label: "Ulubiona drużyna",
		placeholder: "",
	},
];
