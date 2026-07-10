import { Schema, model } from "mongoose";
import { createHmac, randomBytes } from "crypto";
import auth from "../service/auth.js";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  const user = this;
  if (!user.isModified("password")) return;

  const salt = randomBytes(8).toString("hex");
  const hash = createHmac("sha256", salt).update(user.password).digest("hex");

  this.salt = salt;
  this.password = hash;
});

userSchema.static("matchPassword", async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found!");

  const salt = user.salt;
  const hash = user.password;

  const userProvidedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  if (userProvidedPassword !== hash) throw new Error("Invalid Password..");

  const token = auth.createToken(user);
  return token;
});

const User = model("userCollection", userSchema);

export default User;
