"use client";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineArrowRight, AiOutlinePoweroff } from "react-icons/ai";
import { VscEye } from "react-icons/vsc";

import users from "../data/users.json";

export default function Home() {
	const [pwType, setPWType] = useState("password");
	const [pw, setPW] = useState("");
	const [pwEyeThingColor, setPWEyeThingColor] = useState("text-gray-300");
	const [clickButton, setClickButton] = useState(1);
	const [rpwtext, setrpwtext] = useState(<div>Reset Password</div>);

	const [user, setUser] = useState(users[0]);

	return (
		<main
			onContextMenu={(e) => e.preventDefault()}
			className="bg-[url(https://i.stack.imgur.com/D3y4G.jpg)] bg-cover bg-no-repeat h-screen bg-blend-saturation select-none"
		>
			<div className="grid grid-cols-3 items-center justify-center h-screen backdrop-blur-md">
				<div className="ml-4">
					<div className="fixed bottom-6">
						{users.map((v: any) => {
							return (
								<div
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
							height={200}
							width={200}
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
										<div className="loader">
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
						<div className="flex justify-center">
							<Image
								onDragStart={(e) => e.preventDefault()}
								src="/noi.webp"
								width={85}
								height={85}
								alt=""
								className="translate-y-1"
							/>
						</div>
						<div className="flex justify-center w-16">
							<Image
								onDragStart={(e) => e.preventDefault()}
								src="/eoa.webp"
								width={50}
								height={50}
								alt=""
								className=""
							/>
						</div>
						<div className="flex justify-center w-16">
							<AiOutlinePoweroff size={45} />
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
