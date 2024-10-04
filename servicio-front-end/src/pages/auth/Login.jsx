import { useNavigate } from "react-router-dom";
import { signIn } from "../../api/auth/signIn";
import "./Login.css";
import { getCookie, saveCookie } from "../../utils/Cookies";
import { Cookies } from "../../constants/Globals";
import { useState } from "react";
import { useEffect } from "react";

function Login() {
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

		signIn(data.email, data.password).then((res) => {
			saveCookie(Cookies.JWT_TOKEN, res.token);
			navigate("/home");
		});
	};
	return (
		<div className="login-container">
			<div className="background">
				<div className="shape"></div>
				<div className="shape"></div>
			</div>
			<form onSubmit={onSubmit}>
				<h3>Login Here</h3>

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
					onChange={OnchangeData}
					placeholder="Password"
					id="password"
				/>

				<input type="submit" value="Log In"/>
				<div>
					<br />
					<p>
						Don't have an account? <a href="/register">Register</a>
					</p>
					<p>
						Forgot Password?{" "}
						<a href="/forgot-password">Reset Password</a>
					</p>
				</div>
			</form>
		</div>
	);
}

export default Login;
