import * as z from "zod";

export const registerFormSchema = z
	.object({
		email: z.string().email("This is not a valid email."),
		password: z.string().min(6, {
			message: "Password must be at least 6 characters long",
		}),
		passwordConfirm: z.string(),
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: "Passwords don't match",
		path: ["passwordConfirm"],
	});

export const loginFormSchema = z.object({
	email: z.string().email("This is not a valid email."),
	password: z.string(),
});

export const profileSetupFormSchema = z.object({
	name: z
		.string()
		.min(5, { message: "Name must be at least 5 characters long" })
		.refine(
			(s) => !s.includes(" "),
			"Nazwa użytkownika nie może zawierać spacji",
		),
	description: z.string().optional(),
	favouriteTeam: z.string().optional(),
});
