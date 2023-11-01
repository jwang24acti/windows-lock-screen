"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WindowsPage() {
	const [count, setCount] = useState(30);
	const [closeHover, setcloseHover] = useState(false);

	const router = useRouter();

	const [signingOut, setSigningOut] = useState(false);

	const signoutPage = (
		<div className="bg-sky-500 h-screen w-full flex flex-col items-center justify-center">
			<div className="loader">
				<div className="circle"></div>
				<div className="circle"></div>
				<div className="circle"></div>
				<div className="circle"></div>
				<div className="circle"></div>
			</div>
			<div className="text-lg mt-16">Signing Out...</div>
		</div>
	);

	useEffect(() => {
		if (count == 0) {
			setSigningOut(true);
			setTimeout(() => {
				router.push("/");
			}, 5000);
		}

		setTimeout(() => {
			setCount(count - 1);
		}, 1000);
	}, [count]);

	return signingOut ? (
		signoutPage
	) : (
		<main
			className="bg-[url(/CachedImage_1600_900_POS4.jpg)] bg-cover bg-no-repeat h-screen select-none"
			onContextMenu={(e) => e.preventDefault()}
		>
			<div className="flex items-center justify-center h-screen">
				<div className="bg-sky-600 w-3/4 h-96 p-5 grid grid-rows-2">
					<div>
						<div className="text-5xl">You're about to be signed out.</div>
						<div className="text-2xl my-7">
							Windows will sign out in <span>{count}</span> seconds.
						</div>
						<div className="text-2xl">Hint: use the password "incorrect"</div>
					</div>
					<div className="flex justify-end w-full items-end gap-4">
						<button
							className=" w-28 h-10 border-white border-2 hover:opacity-80"
							onClick={(e) => {
								setSigningOut(true);
								setTimeout(() => {
									router.push("/");
								}, 5000);
							}}
						>
							Sign Out
						</button>
						<button
							onMouseEnter={(e) => setcloseHover(true)}
							onMouseLeave={(e) => setcloseHover(false)}
							className=" w-28 h-10 border-white border-2 hover:opacity-80"
						>
							Close
						</button>
						<div
							className={`fixed ${
								closeHover
									? "transition-opacity ease-in duration-700 opacity-100 visible"
									: "opacity-0 invisible"
							} -translate-y-10 font-light text-xs bg-slate-800 border border-slate-900 py-2 px-3`}
						>
							Can't close this 😂(╯‵□′)╯︵┻━┻
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
