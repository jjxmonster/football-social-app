"use client";
import React, { useState } from "react";

import Link from "next/link";
import { RegisterForm } from "@/components/register/register-form/register-form";
import { SuccessCard } from "@/components/register/register-form/success-card";

const Register = () => {
	const [showSuccess, setShowSuccess] = useState(false);
	return showSuccess ? (
		<SuccessCard />
	) : (
		<div className="mx-5 w-full flex-col  md:w-auto">
			<h2 className="text-3xl font-bold text-white">Create account</h2>
			<p className="text-gray-400">Be the part of the community</p>
			<RegisterForm setShowSuccess={setShowSuccess} />
			<div className="absolute bottom-20 left-0 right-0 m-auto flex justify-center text-white ">
				<span>Already have an account?</span>
				<Link href="/login" className="pl-2 text-primary">
					Sign in
				</Link>
			</div>
		</div>
	);
};

export default Register;
