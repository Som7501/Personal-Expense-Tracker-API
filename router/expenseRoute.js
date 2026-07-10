import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Expense from "../models/expenseDB.js";
import { checkCookie } from "../middleware/authMiddleware.js";

const router = Router();
const uploadDir = path.resolve("./documents/Uploads");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedExt = [".pdf", ".jpg", ".jpeg", ".png", ".gif"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExt.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF and image files are allowed"), false);
    }
  },
});

router.get("/add-new", (req, res) => {
  return res.render("addNewExpense", { user: req.user || null });
});

router.get("/", async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const expenses = userId
      ? await Expense.find({ person: userId }).sort({ date: -1 })
      : [];

    return res.render("HomePage", { user: req.user || null, expenses });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error! Can't fetch Expenses");
  }
});

router.post("/", upload.single("supportFile"), async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    const { expenseName, expenseCategory, money, date } = req.body;
    const file = req.file;
    const supportFile = file ? `/Uploads/${path.basename(file.path)}` : "";
    const supportFileType = file
      ? file.mimetype.includes("pdf")
        ? "pdf"
        : "image"
      : "none";

    await Expense.create({
      expenseName,
      expenseCategory,
      money: Number(money),
      date: date ? new Date(date) : new Date(),
      person: userId,
      supportFile,
      supportFileType,
    });

    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error! Can't add Expense");
  }
});

router.post("/delete/:id", async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    if (!userId || !req.user) {
      return res.status(400).send("User not logged in");
    }

    await Expense.findOneAndDelete({
      _id: req.params.id,
      person: userId,
    });

    return res.redirect("/");
  } catch (error) {
    return res.status(500).send("Server Error! Can't delete Expense");
  }
});

router.get(["/summary/:category", "/category-summary/:category"], async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    if (!userId || !req.user) {
      return res.status(400).send("User not logged in");
    }

    const expenses = await Expense.find({
      person: userId,
      expenseCategory: req.params.category,
    });

    const total = expenses.reduce((sum, item) => sum + Number(item.money || 0), 0);

    return res.json({
      category: req.params.category,
      total,
      count: expenses.length,
    });
  } catch (error) {
    return res.status(500).send("Server Error! Can't calculate Summary");
  }
});

export default router;