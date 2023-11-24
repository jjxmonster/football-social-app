"use client";

import { NextUIProvider } from "@nextui-org/system";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<NextUIProvider>
			<SessionProvider>{children}</SessionProvider>
		</NextUIProvider>
	);
}
