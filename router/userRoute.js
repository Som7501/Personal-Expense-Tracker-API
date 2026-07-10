import {Router} from "express";
import User from "../models/userDB.js";

const router = Router();

router.get("/login", (req, res) => {
  return res.render("logIn");
});

router.get("/register", (req, res) => {
  return res.render("Register");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await User.matchPassword(email, password);
    if (!token) return res.status(400).send("User not found");

    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res
      .status(400)
      .send(error.message);
  }
});

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).send("All fields are required");

  try {
    await User.create({
      username,
      email,
      password,
    });

    return res.redirect("/login");
  } catch (error) {
    return res
      .status(500)
      .send("Registration failed, check the /register route");
  }
});

router.get("/logout", (req, res) => {
  return res.clearCookie("token").redirect("/");
});

export default router;
