import { Home } from "./pages/Home";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { getCookie } from "./utils/Cookies";
import { Cookies } from "./constants/Globals";

export function App() {
	//get actual location (url)
	const location = window.location.pathname;
	const noTokenRoute = ["/login", "/register", "/"];
	if (
		!noTokenRoute.includes(location) &&
		getCookie(Cookies.JWT_TOKEN) === null
	) {
		window.location.replace("/");
	}
	//  else {
	// 	window.location.replace("/home");
	// }
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate to="/login" replace />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/home" element={<Home />} />
				<Route path="*" element={<>Not Found</>} />
			</Routes>
		</BrowserRouter>
	);
}
