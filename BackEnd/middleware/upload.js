import multer from "multer";

/**
 * In Vercel serverless functions the filesystem is read‑only except for the
 * temporary `/tmp` directory. Storing uploaded files on disk (as the previous
 * implementation did) causes a runtime error, which surfaces as a 500 Internal
 * Server Error when the `/api/upload/image` endpoint is hit.
 *
 * To make the upload route compatible with Vercel we use **memory storage** –
 * Multer keeps the file buffer in RAM and we pass that directly to Cloudinary.
 * This eliminates any need for a persistent local `uploads` folder.
 */
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const ext = allowed.test(
      // file.originalname may contain a dot‑extension; we check it case‑insensitively
      file.originalname.split('.').pop().toLowerCase()
    );
    const mime = allowed.test(file.mimetype);
    if (ext && mime) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed (jpeg, jpg, png, webp)"));
    }
  },
});

export default upload;