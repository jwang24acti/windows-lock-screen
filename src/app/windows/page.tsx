"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Draggable from "react-draggable";
import { BsChevronDown, BsSquare, BsX } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";
import Image from "next/image";
import { AiOutlineArrowRight, AiOutlinePoweroff } from "react-icons/ai";
import { VscEye } from "react-icons/vsc";
import { BsMoon, BsAirplane } from "react-icons/bs";
import { VscDebugRestart } from "react-icons/vsc";

export default function WindowsPage() {
	const router = useRouter();
	const [showTaskManager, setTaskManager] = useState(false);
	const [showCtrlAltDelPage, setCtrlAltDelPage] = useState(false);
	const [signingOut, setSigningOut] = useState(false);
	const [internetHover, setInternetHover] = useState(false);
	const [EOAHover, setEOAHover] = useState(false);
	const [powerHover, setPowerHover] = useState(false);

	const [powerMenu, setPowerMenu] = useState(false);
	const [internetMenu, setInternetMenu] = useState(false);
	const [eoaMenu, setEOAMenu] = useState(false);

	const [sleepHover, setSleepHover] = useState(false);
	const [shutdownHover, setShutDownHover] = useState(false);
	const [restartHover, setRestartHover] = useState(false);

	const internetRef = useRef(null);
	const eoaREF = useRef(null);
	const powerRef = useRef(null);

	const internetOutsideClick = OutsideClick(internetRef);
	const eoaOutsideClick = OutsideClick(eoaREF);
	const powerOutsideClick = OutsideClick(powerRef);

	useEffect(() => {
		internetOutsideClick && setInternetMenu(false);
		eoaOutsideClick && setEOAMenu(false);
		powerOutsideClick && setPowerMenu(false);
	}, [internetOutsideClick, eoaOutsideClick, powerOutsideClick]);

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

	const ctrlAltDelPage = (
		<div className="bg-sky-600 h-screen w-full flex items-center justify-center">
			<div className="grid grid-rows-3 gap-8">
				<div
					className="cursor-pointer hover:opacity-80"
					onClick={(e) => {
						setSigningOut(true);
						setTimeout(() => {
							router.push("/");
						}, 5000);
					}}
				>
					Switch user
				</div>
				<div
					onClick={(e) => {
						setTaskManager(true);
						setCtrlAltDelPage(false);
					}}
					className="cursor-pointer hover:opacity-80"
				>
					Task Manager
				</div>
				<div>
					<button
						className="w-32 h-8 bg-sky-400 bg-opacity-60 outline outline-2 outline-sky-500 hover:outline-gray-300"
						onClick={(e) => {
							setCtrlAltDelPage(false);
						}}
					>
						Cancel
					</button>
				</div>
			</div>
			<div className="mr-4">
				<div className="fixed bottom-2 flex items-center text-center right-4">
					<div
						className="flex justify-center hover:bg-white hover:bg-opacity-10 w-14 h-14"
						ref={internetRef}
					>
						<div
							className="w-full flex justify-center"
							onMouseEnter={() => {
								setInternetHover(true);
								setTimeout(function () {
									setInternetHover(false);
								}, 4000);
							}}
							onMouseLeave={() => setInternetHover(false)}
							onClick={(e) => {
								e.preventDefault();
								setInternetMenu(!internetMenu);
							}}
						>
							<Image
								onDragStart={(e) => e.preventDefault()}
								src="/noi.webp"
								width={65}
								height={65}
								alt=""
								className="translate-y-1 max-w-none"
							/>
						</div>
						<div
							className={`fixed ${
								internetHover
									? "transition-opacity ease-in duration-700 opacity-100"
									: "opacity-0 invisible"
							} -translate-y-6 font-light text-xs bg-slate-800 border border-slate-900 py-2 px-3`}
						>
							Internet
						</div>
						<div
							ref={internetRef}
							className={`fixed right-0 ${
								internetMenu
									? "transition-opacity ease-in duration-700 opacity-100"
									: "opacity-0 invisible"
							} -translate-y-[195px] font-light text-xs bg-gray-900 w-96 h-48 py-1`}
						>
							<div className="fixed flex flex-col justify-between left-1 bottom-1 h-16 w-24 bg-opacity-80 bg-gray-400 p-1 text-white brightness-125 border-gray-400 border hover:border-white border-1 hover:brightness-110">
								<div>
									<BsAirplane size={18} className="rotate-90 " />
								</div>
								<div className="text-xs">Airplane mode</div>
							</div>
						</div>
					</div>
					<div
						className="flex justify-center w-14 h-14 hover:bg-white hover:bg-opacity-10"
						ref={eoaREF}
					>
						<div
							className="flex items-center justify-center"
							onMouseEnter={() => {
								setEOAHover(true);
								setTimeout(function () {
									setEOAHover(false);
								}, 4000);
							}}
							onMouseLeave={() => setEOAHover(false)}
							onClick={(e) => {
								e.preventDefault();
								setEOAMenu(!eoaMenu);
							}}
						>
							<Image
								onDragStart={(e) => e.preventDefault()}
								src="/eoa.webp"
								width={40}
								height={40}
								alt=""
								className=""
							/>
						</div>
						<div
							className={`fixed ${
								EOAHover
									? "transition-opacity ease-in duration-700 opacity-100 visible"
									: "opacity-0 invisible"
							} -translate-y-6 font-light text-xs bg-slate-800 border border-slate-900 py-2 px-3`}
						>
							Ease of Access
						</div>
						<div
							ref={powerRef}
							className={`fixed right-4 ${
								eoaMenu
									? "transition-opacity ease-in duration-700 opacity-100"
									: "opacity-0 invisible"
							} -translate-y-[380px] font-light text-xs bg-white w-64 py-1`}
						>
							<div>
								<ContrastOptions name={"Narrator"} switchEnabled={true} />
								<ContrastOptions name={"Magnifier"} switchEnabled={false} />
								<ContrastOptions
									name={"On-Screen Keyboard"}
									switchEnabled={false}
								/>
								<ContrastOptions name={"High Contrast"} switchEnabled={true} />
								<ContrastOptions name={"Sticky Keys"} switchEnabled={true} />
								<ContrastOptions name={"Filter Keys"} switchEnabled={true} />
							</div>
						</div>
					</div>
					<div
						ref={powerRef}
						className={`flex justify-center items-center w-14 h-14 ${
							powerMenu == false && "hover:bg-white hover:bg-opacity-10"
						}`}
						onMouseEnter={() => {
							setPowerHover(true);
							setTimeout(function () {
								setPowerHover(false);
							}, 4000);
						}}
						onMouseLeave={() => setPowerHover(false)}
						onClick={(e) => {
							e.preventDefault();
							setPowerMenu(!powerMenu);
						}}
					>
						<AiOutlinePoweroff size={35} />
						<div
							className={`fixed opacity-0 ${
								powerHover == true &&
								powerMenu == false &&
								"transition-opacity ease-in duration-700 opacity-100"
							} -translate-y-10 font-light text-xs bg-slate-800 border border-slate-900 py-2 px-3`}
						>
							Power
						</div>
						<div
							ref={powerRef}
							className={`fixed right-0 ${
								powerMenu
									? "transition-opacity ease-in duration-700 opacity-100 visible"
									: "opacity-0 invisible"
							} -translate-y-[92px] font-light text-xs bg-slate-800 border border-slate-900 w-32 py-1 justify-around`}
						>
							<div
								className="flex gap-4 text-base items-center hover:bg-white hover:bg-opacity-20 p-1 py-2"
								onMouseEnter={() => {
									setSleepHover(true);
									setTimeout(function () {
										setSleepHover(false);
									}, 6000);
								}}
								onMouseLeave={() => setSleepHover(false)}
							>
								<div>
									<BsMoon className="-scale-100 rotate-[65deg]" />
								</div>
								<div>Sleep</div>
								<div
									className={`fixed ${
										sleepHover
											? "transition-opacity ease-in duration-700 opacity-100 visible"
											: "invisible opacity-0"
									} -translate-y-10 -translate-x-36 w-60 font-light text-xs bg-slate-800 border border-slate-900 py-2 px-3 z-10`}
								>
									The PC stays on but uses low power. Apps stay open so when the
									PC wakes up, you're instanly back to where you left off.
								</div>
							</div>
							<div
								className="flex gap-4 text-base items-center hover:bg-white hover:bg-opacity-20 p-1 py-2"
								onMouseEnter={() => {
									setShutDownHover(true);
									setTimeout(function () {
										setShutDownHover(false);
									}, 6000);
								}}
								onMouseLeave={() => setShutDownHover(false)}
							>
								<div>
									<AiOutlinePoweroff />
								</div>
								<div>Shutdown</div>
								<div
									className={`fixed ${
										shutdownHover
											? "transition-opacity ease-in duration-700 opacity-100 visible"
											: "invisible opacity-0"
									} -translate-y-10 -translate-x-36 w-60 font-light text-xs bg-slate-800 border border-slate-900 py-2 px-3 z-10`}
								>
									Closes all apps and turns off the PC
								</div>
							</div>
							<div
								className="flex gap-4 text-base items-center hover:bg-white hover:bg-opacity-20 p-1 py-2"
								onMouseEnter={() => {
									setRestartHover(true);
									setTimeout(function () {
										setRestartHover(false);
									}, 6000);
								}}
								onMouseLeave={() => setRestartHover(false)}
							>
								<div>
									<VscDebugRestart />
								</div>
								<div>Restart</div>
								<div
									className={`fixed ${
										restartHover
											? "transition-opacity ease-in duration-700 opacity-100 visible"
											: "invisible opacity-0"
									} -translate-y-10 -translate-x-36 w-60 font-light text-xs bg-slate-800 border border-slate-900 py-2 px-3 z-10`}
								>
									Closes all apps and turns off the PC
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	useEffect(() => {
		let r = false;
		let y = false;
		document.addEventListener("keydown", (e) => {
			if (e.key == "r") r = true;
			if (e.key == "y") y = true;

			return r && y && setCtrlAltDelPage(true);
		});
		document.addEventListener("keyup", (e) => {
			if (e.key == "r") r = false;
			if (e.key == "y") y = false;
		});
	});

	return showCtrlAltDelPage ? (
		signingOut ? (
			signoutPage
		) : (
			ctrlAltDelPage
		)
	) : (
		<main
			className={`bg-[url(/troll.png)]
			 bg-cover bg-no-repeat h-screen select-none`}
			onContextMenu={(e) => e.preventDefault()}
		>
			{showTaskManager && (
				<Draggable>
					<div className="absolute left-1/2 top-1/4 bg-white text-black text-xs">
						<div className="flex justify-between items-center w-96 pl-2 pb-2">
							<div className="flex justify-evenly gap-3">
								<div>
									<Image src="/tm.png" height={20} width={20} alt="" />
								</div>
								<div className="font-medium ">Task Manager</div>
							</div>
							<div className="grid grid-cols-3">
								<div className="flex items-center justify-center w-10 hover:bg-gray-300">
									<AiOutlineMinus size={20} className="font-light" />
								</div>
								<div className="flex items-center justify-center w-10 hover:bg-gray-300">
									<BsSquare size={12} />
								</div>
								<div
									className="flex items-center justify-center hover:bg-red-600 hover:text-white w-10"
									onClick={(e) => {
										setTaskManager(false);
									}}
								>
									<BsX size={25} />
								</div>
							</div>
						</div>
						<div className="grid grid-cols-3 grid-rows-3 text-gray-500 w-96 h-96 px-2">
							<div>Ctrl</div>
							<div>=</div>
							<div>"`"</div>
							<div>Alt</div>
							<div>=</div>
							<div>"."</div>
							<div>Delete</div>
							<div>=</div>
							<div>"-"</div>
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
			)}

			<div
				className={`absolute bottom-0 right-12 z-10 w-16 h-10 bg-slate-800 text-white text-[.75rem] grid grid-rows-2 items-center justify-center text-center`}
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
			{showTaskManager && (
				<div className="absolute bottom-0 left-[780px]">
					<Image src="/tml.png" height={50} width={50} alt="" />
				</div>
			)}
		</main>
	);
}

function ContrastOptions(props: any) {
	const [enableSwitch, setEnableSwitch]: any = useState(false);

	return (
		<div className="text-black w-3/4 mx-auto py-2">
			<div
				className={`text-left text-lg ${
					props.switchEnabled && "text-gray-400"
				} font-normal`}
			>
				{props.name}
			</div>
			<div
				className={`${
					!props.switchEnabled && "hidden"
				} flex justify-between items-center`}
			>
				<div className="font-medium text-lg">{enableSwitch ? "On" : "Off"}</div>
				<div>
					<div
						className={`w-12 h-4 border-white border outline outline-2 ${
							enableSwitch
								? " bg-sky-700 outline-sky-700 "
								: "bg-gray-500 outline-gray-500"
						}`}
						onClick={(e) => {
							e.preventDefault();
							setEnableSwitch(!enableSwitch);
						}}
					/>
					<div
						className={`fixed h-4 w-2 outline outline-2 outline-black bg-black z-20 translate-y-[-16px] ${
							enableSwitch && "translate-x-10"
						}`}
					/>
				</div>
			</div>
		</div>
	);
}

function OutsideClick(ref: any) {
	const [isClicked, setIsClicked]: any = useState(false);
	useEffect(() => {
		function handleClickOutside(event: any) {
			if (ref.current && !ref.current.contains(event.target)) {
				setIsClicked(true);
			} else {
				setIsClicked(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);
	return isClicked;
}
