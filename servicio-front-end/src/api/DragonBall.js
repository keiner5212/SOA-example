import { Cookies } from "../constants/Globals";
import { getCookie } from "../utils/Cookies";

const ApiBase = import.meta.env.VITE_LOGIC_SERVICE_API;

export async function getCharacters(currentPage) {
	const response = await fetch(
		ApiBase + "/api/v1/characters" + "?limit=10&page=" + currentPage,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${getCookie(Cookies.JWT_TOKEN)}`,
			},
		}
	);
	return await response.json();
}
