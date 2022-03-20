import { Request, Response, NextFunction } from "express";
import { UserModel } from "../../models/User";

/* GET CURRENT USER */
const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = await UserModel.findById(req.user?._id);
  res.json(user);
};

export { getUser };
