import React from "react";
import { ProfileSetupForm } from "@/components/authenticated/ProfileSetupForm";
import { getAllTeams } from "@/data/queries";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const ProfileSetup = async () => {
	const session = await getServerSession(authOptions);

	if (!session) return null;

	const data = await getAllTeams(session?.accessToken);

	if (!data) return null;

	return (
		<div className="mx-5 w-full flex-col  md:w-auto">
			<h2 className="text-3xl font-bold text-white">Uzupełnij swój profil!</h2>
			<p className="text-gray-400">
				Witamy w społeczności piłkarskich pasjonatów! Uzupełnij swoje dane i
				dołącz do gry.
			</p>
			<ProfileSetupForm teams={data} session={session} />
		</div>
	);
};

export default ProfileSetup;
