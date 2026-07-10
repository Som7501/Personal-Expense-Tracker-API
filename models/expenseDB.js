import { Schema, model } from "mongoose";

const expenseSchema = new Schema({
  expenseName: {
    type: String,
    required: true,
    trim: true,
  },
  expenseCategory: {
    type: String,
    required: true,
    trim: true,
  },
  money: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  person: {
    type: Schema.Types.ObjectId,
    ref: "userCollection",
    required: true,
  },
  supportFile: {
    type: String,
    default: "",
  },
  supportFileType: {
    type: String,
    enum: ["pdf", "image", "none"],
    default: "none",
  },
}, { timestamps: true });

const Expense = model("expenseCollection", expenseSchema);

export default Expense;