import { UserModel } from "../../models/User";
import passport from "passport";
import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import async from "async";
import jwt from "jsonwebtoken";
require("dotenv").config();

/* CREATE NEW USER */
const newUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if (user) {
      return res.status(500).json({ username: "Username already in use" });
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) return next(err);
        if (err) return next(err);

        new UserModel({
          username,
          password: hash,
        }).save((err, user) => {
          if (err) return next(err);
          res.status(200).json(user);
        });
      });
    }
  } catch (error) {
    return next(error);
  }
};

/* LOGINS LOCAL USER */
const localLogin = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", { session: false }, (err, user) => {
    if (err) return next(err);
    if (!user) res.status(500).json("wrong username or password");
    else {
      req.login(user, { session: false }, (err) => {
        if (err) return next(err);
        const token = jwt.sign(
          { id: user._id },
          process.env.JWT_SECRET as string,
          {
            expiresIn: "10 days",
          }
        );

        res.status(200).json({ user, token });
      });
    }
  })(req, res, next);
};

export { newUser, localLogin };
