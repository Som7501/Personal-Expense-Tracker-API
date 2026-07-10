import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import path from "path";
import { checkCookie, restrictToLoggedinUserOnly } from "./middleware/authMiddleware.js";
import userRoute from "./router/userRoute.js";
import expenseRoute from "./router/expenseRoute.js";

const app = express();
const port = process.env.PORT || 3003;

mongoose
  .connect("mongodb://127.0.0.1:27017/Personal_Expense_Tracker")
  .then(() => console.log("MongoDB connected successfully.."))
  .catch((e) => console.log("Couldn't connect DB cause:", e));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve("./documents")));

app.use(checkCookie("token"));

app.use("/", userRoute);
app.use("/", restrictToLoggedinUserOnly, expenseRoute);

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`),
);
