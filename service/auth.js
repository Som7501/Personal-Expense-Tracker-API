import JWT from "jsonwebtoken";

const secret = process.env.SECRET || "*#Som@2004";

function createToken(user) {
  if (!user) return null;

  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
  };
  const token = JWT.sign(payload, secret, { expiresIn: "1d" });
  return token;
}

function validateToken(token) {
  if (!token) return null;

  const decode = JWT.verify(token, secret);
  return decode;
}

export default { createToken, validateToken };
