import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { router as indexRouter } from "./routes/routes";
import cors from "cors";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config();

import { Request, Response, NextFunction, Application } from "express";

require("./Auth/passport-local");
require("./Auth/jwt");

const app: Application = express();
app.use(cors());

/* DB CONNECTION */
const mongoDB = process.env.MONGO_URI;
const db = mongoose.connection;
mongoose.connect(mongoDB!);
db.on("error", console.error.bind(console, "Mongo connection error"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/products", indexRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err.message);
});

const port: any | number = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started on${port}`));

module.exports = app;
