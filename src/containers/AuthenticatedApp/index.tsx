import type { UserDetails } from "@/lib/types";
import { redirect } from "next/navigation";

interface AuthenticatedAppProps {
	user: UserDetails;
}

export const AuthenticatedApp = ({ user }: AuthenticatedAppProps) => {
	console.log(user, "IS COMPLETED");
	if (!user.isProfileCompleted) {
		return redirect("/profile-setup");
	}

	return <div>auth</div>;
};
