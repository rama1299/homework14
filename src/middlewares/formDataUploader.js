import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "-" + file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
});

export default function withUploader(fieldName) {
  const handler = (req, res, next) => {
    const fn = upload.single(fieldName);

    fn(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ data: null, message: err.message });
      } else if (err) {
        return res.status(500).json({ data: null, message: err.message });
      }

      next();
    });
  };

  return handler;
}
