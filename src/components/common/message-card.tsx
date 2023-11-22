"use client";
import { Card, CardBody } from "@nextui-org/card";
import classNames from "classnames";
import { Check, XCircle } from "lucide-react";

type MessageCardProps = {
	message: string;
	type: "error" | "success";
	transparent?: boolean;
};

export const MessageCard = ({
	message,
	type,
	transparent = false,
}: MessageCardProps) => {
	const icon = type === "success" ? <Check size={20} /> : <XCircle size={20} />;

	return (
		<Card
			className={classNames({
				"bg-transparent": transparent,
			})}
		>
			<CardBody>
				<p
					className={classNames("flex items-center gap-2", {
						"text-error": type === "error",
						"text-success": type === "success",
					})}
				>
					{icon}
					{message}
				</p>
			</CardBody>
		</Card>
	);
};
