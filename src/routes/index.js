const express = require("express");

const auth = require("../controllers/auth.controller.js");
const file = require("../controllers/file.controller.js");
const { err } = require("../utils");
const {
  authorization,
  fileUpload,
  notFound,
  errorHandler,
} = require("../middlewares");

const router = express.Router();

router.post("/auth/signup", err(auth.register));
router.post("/auth/signin", err(auth.signin));
router.post("/auth/signin/new_token", err(auth.refreshToken));
router.get("/logout", authorization, err(auth.logout));

router.get("/info", authorization, err(auth.info));

router.get("/info", authorization, auth.info);
router.get("/file/list", authorization, err(file.fileList));
router.get("/file/download/:fileId", authorization, err(file.downloadFile));
router.post("/file/upload", authorization, fileUpload, err(file.fileUpload));
router.delete("/file/delete/:fileId", authorization, err(file.deleteFile));
router.get("/file/:fileId", authorization, err(file.getFileInfo));
router.put(
  "/file/update/:fileId",
  authorization,
  fileUpload,
  err(file.updateFile)
);

module.exports = (app) => {
  app.use(express.json());
  app.use("/api", router);
  app.use(notFound);
  app.use(errorHandler);
};
