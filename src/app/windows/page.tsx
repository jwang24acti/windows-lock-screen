"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Draggable from "react-draggable";
import { BsChevronDown, BsSquare, BsX } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";
import Image from "next/image";

export default function WindowsPage() {
	const [count, setCount] = useState(30);
	const [closeHover, setcloseHover] = useState(false);

	const router = useRouter();

	const [signingOut, setSigningOut] = useState(false);
	const [close, setClose] = useState(false);

	const date = new Date();

	function formatAPPM(date: any) {
		let hours = date.getHours();
		let minutes = date.getMinutes();
		let ampm = hours > 12 ? "PM" : "AM";
		hours %= 12;

		hours = hours ? hours : 12;

		minutes = minutes < 10 ? "0" + minutes : minutes;
		let strTime = hours + ":" + minutes + " " + ampm;

		return strTime;
	}

	const signoutPage = (
		<div
			className="bg-sky-500 h-screen w-full flex flex-col items-center justify-center select-none"
			onContextMenu={(e) => e.preventDefault()}
		>
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
			setCount(count + 1);
		}, 1000);
	}, [count]);

	return signingOut ? (
		signoutPage
	) : (
		<main
			className={`${
				close
					? "bg-[url(/troll.png)]"
					: "bg-[url(/CachedImage_1600_900_POS4.jpg)]"
			} bg-cover bg-no-repeat h-screen select-none`}
			onContextMenu={(e) => e.preventDefault()}
		>
			<Draggable>
				<div className="absolute left-1/2 top-1/2 bg-white text-black text-xs">
					<div className="flex justify-between items-center px-4 w-96 h-10">
						<div className="flex justify-evenly gap-3">
							<div>
								<Image src="/tm.png" height={20} width={20} alt="" />
							</div>
							<div className="font-medium ">Task Manager</div>
						</div>
						<div className="grid grid-cols-3 gap-2">
							<div className="flex items-center justify-center ">
								<AiOutlineMinus size={20} className="font-light" />
							</div>
							<div className="flex items-center justify-center">
								<BsSquare size={12} />
							</div>
							<div className="flex items-center justify-center">
								<BsX size={25} />
							</div>
						</div>
					</div>
					<div className="text-center text-gray-500 w-96 h-96">
						There are no running apps
					</div>
					<div className="flex justify-between px-4 h-12 border-t-[.5px] border-black">
						<div className="flex justify-evenly items-center gap-2 text-gray-500">
							<div className="outline-1 outline outline-gray-500 rounded-full p-1">
								<BsChevronDown size={12} />
							</div>
							<div className="text-black font-medium">More details</div>
						</div>
						<div className="flex items-center justify-center">
							<button disabled className="w-24 bg-gray-300 text-gray-500 h-6">
								End Task
							</button>
						</div>
					</div>
				</div>
			</Draggable>
			<div
				className={`${
					close && "hidden"
				} flex items-center justify-center h-screen`}
			>
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
							onClick={(e) => setClose(true)}
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
			<div
				className={` ${
					close == true && signingOut == false ? "" : "hidden"
				} absolute bottom-0 right-12 z-10 w-16 h-10 bg-slate-800 text-white text-[.75rem] grid grid-rows-2 items-center justify-center text-center`}
			>
				<div>{formatAPPM(date)}</div>
				<div>
					{date.getMonth() +
						1 +
						"/" +
						date.getDate() +
						"/" +
						date.getFullYear()}
				</div>
			</div>
		</main>
	);
}
