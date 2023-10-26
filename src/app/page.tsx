"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { VscEye } from "react-icons/vsc";

export default function Home() {
	const [pwType, setPWType] = useState("password");
	const [pw, setPW] = useState("");
	const [pwEyeThingColor, setPWEyeThingColor] = useState("text-gray-300");
	const [clickButton, setClickButton] = useState(1);
	const [rpwtext, setrpwtext]: any = useState("Reset Password");

	return (
		<main className="bg-[url(https://i.stack.imgur.com/D3y4G.jpg)] bg-cover bg-no-repeat h-screen bg-blend-saturation">
			<div className="flex items-center justify-center h-screen backdrop-blur-md ">
				<div className="flex flex-col items-center space-y-2">
					<div>
						<Image
							src="https://www.tenforums.com/attachments/user-accounts-family-safety/322690d1615743307t-user-account-image-log-user.png"
							height={150}
							width={150}
							alt=""
							className="rounded-full"
						/>
					</div>
					<div className="text-4xl font-light text-center">Admin</div>
					{clickButton == 1 || clickButton == 3 ? (
						<div className="border-2 border-gray-300 flex">
							<div className="flex">
								<input
									type={pwType}
									id="pw"
									value={pw}
									onChange={(e) => setPW(e.target.value)}
									className="text-black font-extralight px-2 py-1 outline-none"
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
							</div>
							<div
								className="w-8 bg-gray-400 flex items-center justify-center"
								onClick={(e) => {
									e.preventDefault();
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
								onClick={(e) => {}}
							>
								{rpwtext}
							</div>
						)}
					</div>
				</div>
			</div>
		</main>
	);
}
