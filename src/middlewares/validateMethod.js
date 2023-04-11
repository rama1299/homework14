export default function validateMethod(allowedMethods = ["GET"]) {
  const handler = (req, res, next) => {
    const isAllowed = allowedMethods.includes(req.method);

    if (!isAllowed) {
      res.status(405).json({ data: "405 Method Not Allowed" });
      return;
    }

    next();
  };

  return handler;
}
