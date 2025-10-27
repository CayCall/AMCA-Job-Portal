import multer from "multer";

const storage = multer.memoryStorage();

export const imageOnly = multer({
  storage,
  fileFilter: (_req, file, cb) =>
    /^image\/(png|jpe?g|webp)$/.test(file.mimetype)
      ? cb(null, true)
      : cb(new Error("Only image files are allowed (jpg, png, webp).")),
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const resumeOnly = multer({
  storage,
  fileFilter: (_req, file, cb) =>
    file.mimetype === "application/pdf"
      ? cb(null, true)
      : cb(new Error("Only PDF files are allowed for resumes.")),
  limits: { fileSize: 10 * 1024 * 1024 },
});