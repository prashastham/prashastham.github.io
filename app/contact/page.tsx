"use client";
import { Github, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { Navigation } from "../components/nav";

const socials = [
	{
		icon: <Twitter size={20} />,
		href: "https://twitter.com/SingulrtyPlgrm",
		label: "Twitter",
		handle: "@SingulrtyPlgrm",
	},
	{
		icon: <Mail size={20} />,
		href: "mailto:prashastham@yahoo.com",
		label: "Email",
		handle: "prashastham@yahoo.com",
	},
	{
		icon: <Github size={20} />,
		href: "https://github.com/prashastham",
		label: "Github",
		handle: "prashastham",
	},
];

export default function Example() {
	return (
		<div className=" bg-gradient-to-tl from-cyan-500 via-indigo-600 to-blue-500">
			<Navigation />
			<div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
				<div className="grid w-full grid-cols-1 gap-8 mx-auto mt-32 sm:mt-0 sm:grid-cols-3 lg:gap-16">
					{socials.map((s) => (
						<div
						className="overflow-hidden relative duration-700 border rounded-xl hover:bg-zinc-800/10 group md:gap-8 hover:border-zinc-700 border-zinc-100 hover:animate-pulse">
							<Link
								href={s.href}
								target="_blank"
								className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24  lg:pb-48  md:p-16"
							>
								<span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-zinc-600 group-hover:bg-zinc-100 border-zinc-100 bg-transparent group-hover:border-zinc-600 drop-shadow-orange">
									{s.icon}
								</span>{" "}
								<div className="z-10 flex flex-col items-center">
									<span className="lg:text-xl font-medium duration-150 xl:text-3xl text-zinc-200 group-hover:text-white font-display">
										{s.handle}
									</span>
									<span className="mt-4 text-sm font-bold text-center duration-1000 text-zinc-400 group-hover:text-zinc-200">
										{s.label}
									</span>
								</div>
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
