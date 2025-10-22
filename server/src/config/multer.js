import multer from "multer";

const ImageStore = multer.diskStorage({})

const upload = multer({ImageStore})

export default upload;
