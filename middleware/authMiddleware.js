import auth from "../service/auth.js";

export function checkCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookie = req.cookies[cookieName];
    if (!tokenCookie) return next();
    try {
      const userPayload = auth.validateToken(tokenCookie);
      req.user = userPayload;
    } catch (e) {
      res.clearCookie(cookieName)
      console.log("Internal Server Error:", e);
    }
    next();
  };
}

export function restrictToLoggedinUserOnly(req, res, next) {
  if(!req.user){
    return res.redirect("/login")
  }
  next();
}
