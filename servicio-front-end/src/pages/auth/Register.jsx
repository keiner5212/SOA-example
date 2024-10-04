import { useNavigate } from "react-router-dom";
import { signUp } from "../../api/auth/signUp";
import "./Login.css";
import { useState } from "react";
import { useEffect } from "react";

function Register() {
	const [data, setData] = useState({});
	const navigate = useNavigate();
	const OnchangeData = (e) => {
		setData({ ...data, [e.target.id]: e.target.value });
	};
	useEffect(() => {
		if (getCookie(Cookies.JWT_TOKEN)) {
			navigate("/home");
		}
	}, []);
	const onSubmit = (e) => {
		e.preventDefault();

		if (!data.email || !data.password) {
			return;
		}

		signUp(data.email, data.password).then((res) => {
			console.log(res);
			navigate("/login");
		});
	};
	return (
		<div className="login-container">
			<div className="background">
				<div className="shape"></div>
				<div className="shape"></div>
			</div>
			<form onSubmit={onSubmit}>
				<h3>Register Here</h3>

				<label htmlFor="email">Username</label>
				<input
					type="text"
					onChange={OnchangeData}
					placeholder="Email"
					id="email"
				/>

				<label htmlFor="password">Password</label>
				<input
					type="password"
					placeholder="Password"
					onChange={OnchangeData}
					id="password"
				/>

				<input type="submit" value="Register" />

				<div>
					<br />
					<p>
						Already have an account? <a href="/login">Login</a>
					</p>
				</div>
			</form>
		</div>
	);
}

export default Register;
