"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { AiOutlineArrowRight, AiOutlinePoweroff } from "react-icons/ai";
import { VscEye } from "react-icons/vsc";
import { BsMoon, BsAirplane } from "react-icons/bs";
import { VscDebugRestart } from "react-icons/vsc";

import users from "../data/users.json";

export default function Home() {
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
	function OutsideClick(ref: any) {
		const [isClicked, setIsClicked]: any = useState(true);
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
	useEffect(() => {
		internetOutsideClick && setInternetMenu(false);
		eoaOutsideClick && setEOAMenu(false);
		powerOutsideClick && setPowerMenu(false);
	}, [internetOutsideClick, eoaOutsideClick, powerOutsideClick]);

	const [pwType, setPWType] = useState("password");
	const [pw, setPW] = useState("");
	const [pwEyeThingColor, setPWEyeThingColor] = useState("text-gray-300");
	const [clickButton, setClickButton] = useState(1);
	const [rpwtext, setrpwtext] = useState(<div>Reset Password</div>);

	const [user, setUser] = useState(users[0]);
	const LoginPage = (
		<main
			onContextMenu={(e) => e.preventDefault()}
			className="bg-[url(/bg.jpg)] bg-cover bg-no-repeat h-screen bg-blend-saturation select-none"
		>
			<div className="grid grid-cols-3 items-center justify-center h-screen backdrop-blur-md">
				<div className="ml-4">
					<div className="fixed bottom-6">
						{users.map((v: any, i: number) => {
							return (
								<div
									key={i}
									className={`flex items-center px-2 py-1 ${
										user.id !== v.id && "hover:bg-white hover:bg-opacity-10"
									} cursor-pointer ${
										user.id == v.id &&
										"bg-opacity-80 bg-cyan-700 hover:bg-opacity-50"
									}`}
									onClick={(e) => {
										setUser(v);
									}}
								>
									<div className="">
										<div>
											<Image
												src={v.image}
												width={50}
												height={50}
												alt=""
												className="rounded-full"
											/>
										</div>
									</div>
									<div className="ml-4">{v.user}</div>
								</div>
							);
						})}
					</div>
				</div>
				<div className="flex flex-col items-center space-y-6">
					<div>
						<Image
							src={user?.image}
							height={user?.image == "/images.jpg" ? 205 : 200}
							width={user?.image == "/images.jpg" ? 205 : 200}
							alt=""
							className="rounded-full"
							onDragStart={(e) => e.preventDefault()}
						/>
					</div>
					<div className="text-4xl font-light text-center">{user?.user}</div>
					{clickButton == 1 || clickButton == 3 ? (
						<div className="border-2 border-gray-300 flex hover:border-white">
							<form
								className="flex"
								onSubmit={(e) => {
									e.preventDefault();

									setrpwtext(
										<div className="loader">
											<div className="circle"></div>
											<div className="circle"></div>
											<div className="circle"></div>
											<div className="circle"></div>
											<div className="circle"></div>
										</div>
									);

									setTimeout(function () {
										setrpwtext(<div>Reset Password</div>);
									}, 3000);
									setClickButton(2);
								}}
							>
								<input
									type={pwType}
									id="pw"
									value={pw}
									onChange={(e) => setPW(e.target.value)}
									className="text-black px-2 py-1 outline-none"
									placeholder="Password"
								/>
								<div
									className="w-8 flex items-center justify-center bg-white"
									onMouseDown={(e) => {
										e.preventDefault();
										setPWEyeThingColor("text-blue-400");
										setPWType("text");
									}}
									onMouseUp={(e) => {
										e.preventDefault();
										setPWEyeThingColor("text-gray-300");
										setPWType("password");
									}}
								>
									<VscEye
										size={25}
										className={`${pwEyeThingColor} ${
											pw.length < 1 && "hidden"
										}`}
									/>
								</div>
							</form>
							<div
								className="w-8 bg-gray-300 bg-opacity-40 flex items-center justify-center"
								onClick={(e) => {
									e.preventDefault();

									setrpwtext(
										<div className="loader top-3/4">
											<div className="circle"></div>
											<div className="circle"></div>
											<div className="circle"></div>
											<div className="circle"></div>
											<div className="circle"></div>
										</div>
									);

									setTimeout(function () {
										setrpwtext(<div>Reset Password</div>);
									}, 3000);
									setClickButton(2);
								}}
							>
								<AiOutlineArrowRight size={25} />
							</div>
						</div>
					) : (
						<div>
							<div className="font-light my-5">
								The password is incorrect. Try again.
							</div>
							<div className="flex items-center justify-center ">
								<button
									className="w-36 h-10 bg-gray-400 bg-opacity-20 border border-black outline outline-white"
									onClick={(e) => {
										setClickButton(3);
										setrpwtext(<div>Reset Password</div>);
									}}
								>
									OK
								</button>
							</div>
						</div>
					)}
					<div>
						{clickButton == 3 && (
							<div
								className="font-light hover:opacity-75 cursor-pointer"
								onClick={(e) => {
									setrpwtext(
										<div className="loader top-3/4">
											<div className="circle"></div>
											<div className="circle"></div>
											<div className="circle"></div>
											<div className="circle"></div>
											<div className="circle"></div>
										</div>
									);

									setTimeout(function () {
										setrpwtext(<div>An Error Occured. Please Try Again</div>);
									}, 3000);
								}}
							>
								{rpwtext}
							</div>
						)}
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
									<ContrastOptions
										name={"High Contrast"}
										switchEnabled={true}
									/>
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
										The PC stays on but uses low power. Apps stay open so when
										the PC wakes up, you're instanly back to where you left off.
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
		</main>
	);

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
					<div className="font-medium text-lg">
						{enableSwitch ? "On" : "Off"}
					</div>
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

	const loginPage = LoginPage;

	return loginPage;
}
