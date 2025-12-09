import express from "express"
import multer from "multer"
import path from "path"
import {v2 as cloudinary} from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: 'dimwxfylg',
  api_key: '476988785944972',
  api_secret: 'h7Y9Jcbe0l4c3Hjk1D6UWTvyscc',
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "png", "jpeg", "webp"]
  }
})

const upload = multer({
  storage
})


//Upload file in server itslef
// //storage operation
// const storage = multer.diskStorage({
//   destination: (req, file, cb)=>{
//     cb(null, "uploads/")
//   },
//   filename: (req, file, cb)=>{
//     // cb(null, Date.now() + path.extname(file.originalname))
//     cb(null, Date.now() + "-" + file.originalname);
//   }
// })

// //Storage Initialize
// const upload = multer({
//   storage, //storage: storage
//   limits: {fileSize: 5 * 1024 * 1024} //filesize should be on bytes
  
// })

const router = express.Router();

router.post("/upload", upload.single("image"), (req, res) => {
  res.send({message: `Image uploaded: ${req.file.filename}`})
})

export default router;



