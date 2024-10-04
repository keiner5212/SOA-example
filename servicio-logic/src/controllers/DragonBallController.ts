import { Request, Response, Router } from "express";
import { verifyToken } from "../middlewares/jwt";
import { DragonBallDAO } from "../dao/DragonBallDAO";
import { HttpStatusCode } from "axios";
import { CheckCache } from "../middlewares/Cache";
import { Cache } from "../utils/cache";

export class DragonBallController extends DragonBallDAO {
	private router: Router;

	constructor() {
		super();
		this.router = Router();
	}

	public routes(): Router {
		// get all
		this.router.get(
			"/characters",
			verifyToken,
			CheckCache,
			async (req: Request, res: Response) => {
				const { limit, page } = req.query;
				if (!limit || !page) {
					return res
						.status(HttpStatusCode.BadRequest)
						.send("Limit and Page are required");
				}
				const data = await DragonBallDAO.getCharacters(
					parseInt(limit as string),
					parseInt(page as string)
				);
				Cache.set(req.body.cacheKey, data[1]);
				return res.status(data[2]).send(data[1]);
			}
		);

		return this.router;
	}
}
