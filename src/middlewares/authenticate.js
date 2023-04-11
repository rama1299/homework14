import jwt from "jsonwebtoken";

export function authenticateToken() {
  const handler = (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(" ")[1];

      if (!token) return res.status(401).json({ data: "Unauthorized" });

      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = user.userId;

      next();
    } catch (e) {
      res.status(401).json({ data: "Unauthorized" });
    }
  };

  return handler;
}
