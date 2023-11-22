import * as React from "react";

import Link from "next/link";
import { LoginForm } from "@/components/login/login-form/login-form";

const Login = () => {
	return (
		<div className="mx-5 flex-col">
			<h2 className="text-3xl font-bold text-white">Hello again</h2>
			<p className="text-gray-400">
				Enter the information you entered while registering
			</p>
			<LoginForm />
			<div className="absolute bottom-20 left-0 right-0 m-auto flex justify-center text-white ">
				<span>Don{"'"}t you have an account?</span>
				<Link href="/register" className="pl-2 text-primary">
					Sign up
				</Link>
			</div>
		</div>
	);
};

export default Login;
