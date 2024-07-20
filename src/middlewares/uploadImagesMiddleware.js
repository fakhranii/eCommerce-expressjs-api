import multer from "multer";
import { ApiError } from "../utils/classes/apiError.js";

const multerFilter = () => {
  //! 1- DiskStorage engine -> if you store the Images in the project storage
  // const storage = multer.diskStorage({
  //   //  cb (callback) is like the next()
  //   destination: function (req, file, cb) {
  //     cb(null, "src/uploads/categories");
  //   },
  //   filename: function (req, file, cb) {
  //     // unique category name = category-Id-Date.now.jepg
  //     const ImageExtension = file.mimetype.split("/")[1];
  //     const fileName = `category-${uuidv4()}-${Date.now()}.${ImageExtension}`;
  //     cb(null, fileName);
  //   },
  // });

  const multerStorage = multer.memoryStorage();
  // force the user to upload only images
  const multerfilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true); // err, success
    } else {
      cb(new ApiError("You can upload only images", 400), false);
    }
  };
  const upload = multer({ storage: multerStorage, fileFilter: multerfilter });
  return upload;
};

export const uploadSingleImage = (fieldName) =>
  multerFilter().single(fieldName);

export const uploadMixedImages = (arrayOfFields) =>
  multerFilter().fields(arrayOfFields);
