import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getUserData } from "@/data/queries";
import { AuthenticatedApp } from "@/containers/AuthenticatedApp";
import { notFound, redirect } from "next/navigation";

export default async function Home() {
	const session = await getServerSession(authOptions);
	const data = await getUserData(session?.accessToken as string);

	if (!data) {
		notFound();
	}

	return (
		<main>
			{session && data ? <AuthenticatedApp user={data} /> : <>no auth</>}
		</main>
	);
}
