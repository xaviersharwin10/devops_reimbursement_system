import { Request, Response, NextFunction } from "express";

export const verifyUserType = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userType = req.user?.userType;

	if (!userType) {
		return res.status(500).json({
			isError: true,
			message: "Internal Server Error",
		});
	}

	if (userType !== "manager") {
		return res
			.status(401)
			.json({ isError: true, message: "Unauthorized action" });
	}

    next()
};
