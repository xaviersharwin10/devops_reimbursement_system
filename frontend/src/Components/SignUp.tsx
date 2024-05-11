import React, { useState } from "react";
import { userRoutes } from "../Routes/userRoutes";

type DisplayValue = "login" | "register" | "expense-form" | "expense" | "";
interface Props {
	setDisplay: React.Dispatch<React.SetStateAction<DisplayValue>>;
	notify: any;
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
function SignUp({ setDisplay, notify, setIsLoading, isLoading }: Props) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("employee");
	const [showPassword, setShowPassword] = useState(false);

	const handleSignUpSubmit = (e: any) => {
		e.preventDefault();

		if (email && password) {
			signUpFunction();
		} else {
			if (!name) {
				let message = "Please enter a valid name";
				notify(message, "warning");
			} else if (!email) {
				let message = "Please enter a valid email";
				notify(message, "warning");
			} else {
				let message = "Please enter a password";
				notify(message, "warning");
			}
		}
	};
	const signUpFunction = () => {
		let user = {
			name,
			email,
			password,
			userType: role,
		};
		setIsLoading(true);

		fetch(userRoutes.register, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.isError) {
					notify(res.message, "warning");
					setIsLoading(false);
				} else {
					handleSuccessfulSignup(res);
				}
			})
			.catch((err) => {
				console.log(err);
				notify(err.message, "error");
				setIsLoading(false);
			});
	};
	const handleSuccessfulSignup = (res: any) => {
		let user = res.user;
		localStorage.setItem("userInfo", JSON.stringify(user));
		localStorage.setItem("token", res.token);
		setTimeout(() => {
			setDisplay("");
			window.location.reload();
		}, 3000);
	};

	const functionlityOnDevelopment = () => {
		notify("This functioinlity is not available right now", "info");
	};
	
	return (
		<div>
			<form className="form">
				<div className="flex-column">
					<label>Name </label>
				</div>
				<div className="inputForm">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.4"
						stroke="currentColor"
						style={{ width: "24px" }}
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
						/>
					</svg>

					<input
						type="text"
						className="input"
						placeholder="Enter your Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>

				<div className="flex-column">
					<label>Email </label>
				</div>
				<div className="inputForm">
					<svg
						height="20"
						viewBox="0 0 32 32"
						width="20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g id="Layer_3" data-name="Layer 3">
							<path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
						</g>
					</svg>
					<input
						type="text"
						className="input"
						placeholder="Enter your Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div className="flex-column">
					<label>Password </label>
				</div>
				<div className="inputForm">
					<svg
						height="20"
						viewBox="-64 0 512 512"
						width="20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
						<path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
					</svg>
					<input
						type={showPassword ? "text" : "password"}
						className="input"
						placeholder="Enter your Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					{showPassword ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.4"
							stroke="currentColor"
							style={{ width: "24px" }}
							onClick={() => setShowPassword((pre) => !pre)}
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
							/>
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.4"
							stroke="currentColor"
							style={{ width: "24px" }}
							onClick={() => setShowPassword((pre) => !pre)}
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
							/>
						</svg>
					)}
				</div>

				<div className="flex-column">
					<label>Role in company </label>
				</div>
				<div
					className="inputForm"
					style={{
						display: "flex",
						justifyContent: "space-evenly",
						border: "0px",
					}}
				>
					<label style={{ cursor: "pointer" }}>
						<input
							type="radio"
							name="visibility"
							value="onlyMe"
							checked={role === "employee"}
							onChange={() => setRole("employee")}
						/>
						Employee
					</label>
					<label style={{ cursor: "pointer" }}>
						<input
							type="radio"
							name="visibility"
							value="public"
							checked={role === "manager"}
							onChange={() => setRole("manager")}
						/>
						Manager
					</label>
				</div>

				<div className="flex-row">
					<div>
						<input type="checkbox" />
						<label>Remember me </label>
					</div>
					<span className="span" onClick={functionlityOnDevelopment}>
						Forgot password?
					</span>
				</div>
				<button className="button-submit" onClick={handleSignUpSubmit}>
					Sign Up
				</button>
			</form>
		</div>
	);
}

export default SignUp;
