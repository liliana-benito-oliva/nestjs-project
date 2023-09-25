import { GetDatasetsRequest } from "../schemas/requests/get-datasets-request";
import { v4 as uuid } from "uuid";
import { HttpException, HttpStatus } from "@nestjs/common";
import { extname } from "path";
import { diskStorage } from "multer";
import { existsSync, mkdirSync } from "fs";

export const multerConfig = {
  dest: process.env.UPLOAD_LOCATION || './uploads',
};

export const multerOptions = {
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(csv)$/)) {
      cb(null, true);
    } else {
      cb(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST
        ),
        false
      );
    }
  },
  storage: diskStorage({
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = multerConfig.dest;
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: (req: any, file: any, cb: any) => {
      cb(null, `${uuid()}${extname(file.originalname)}`);
    },
  }),
};

export const validateDatasetQueryParams = (
  params: GetDatasetsRequest
): boolean => {
  return params.methods.length > 0; //TODO MORE
};