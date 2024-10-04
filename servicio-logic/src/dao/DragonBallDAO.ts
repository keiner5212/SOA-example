import axios, { HttpStatusCode } from "axios";
import { DaoResponse, ErrorControl } from "../constants/ErrorControl";
import { createDebugger } from "../utils/debugConfig";
import { GlobalConstants } from "../constants/Global";

// logger config
const log = createDebugger("DragonBallDAO");
const logError = log.extend("error");

export class DragonBallDAO {
	protected static async getCharacters(
		limit: number,
		page: number
	): Promise<DaoResponse> {
		try {
			const fetching =
				GlobalConstants.DRAGON_BALL_API +
				"/characters?limit=" +
				limit +
				"&page=" +
				page;

			log(fetching);
			const response = await axios.get(fetching);

			if (response.status !== HttpStatusCode.Ok)
				return [
					ErrorControl.ERROR,
					response.data,
					HttpStatusCode.InternalServerError,
				];

			return [ErrorControl.SUCCESS, response.data, HttpStatusCode.Ok];
		} catch (error) {
			const msg = "Error getting documents!";
			logError(msg + ": " + error);
			return [
				ErrorControl.ERROR,
				msg,
				HttpStatusCode.InternalServerError,
			];
		}
	}
}
