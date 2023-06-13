const fs = require("fs");
const path = require("path");
const ApiError = require("../exceptions/apiError")
const { files } = require("../models");

const UPLOADS_FOLDER = path.join(__dirname, "..", "..", "uploads");

class FileService {
  async uploadFile(incomingFile) {
    const file = await files.create({
      name: incomingFile.filename,
      extension: incomingFile.filename.split(".").pop(),
      mimeType: incomingFile.mimetype,
      size: incomingFile.size,
      dateUpload: Date.now(),
    });

    await file.save();

    return file;
  }

  async getFilePath(fileId) {
    const file = await files.findOne({
      where: {
        id: fileId,
      },
    });
    if (!file) {
      throw ApiError.fileNotExistsError(fileId);
    }

    return path.join(UPLOADS_FOLDER, file.name);
  }

  async deleteFile(fileId) {
    const file = await files.destroy({
      where: {
        id: fileId,
      },
    });
    if (!file) {
      throw ApiError.fileNotExistsError(fileId);
    }

    fs.unlinkSync(path.join(UPLOADS_FOLDER, file.name));
  }

  async getFileInfo(fileId) {
    const file = await files.findOne({
      where: {
        id: fileId,
      },
    });
    if (!file) {
      throw ApiError.fileNotExistsError(fileId);
    }

    return file;
  }

  async updateFile(incomingFile, fileId) {
    const file = await files.findOne({
      where: {
        id: fileId,
      },
    });
    if (!file) {
      throw ApiError.fileNotExistsError(fileId);
    }
    fs.unlinkSync(path.join(UPLOADS_FOLDER, file.name));

    await file.update({
      name: incomingFile.filename,
      extension: incomingFile.filename.split(".").pop(),
      mimeType: incomingFile.mimetype,
      size: incomingFile.size,
      dateUpload: Date.now(),
    }, {});
    await file.save();

    return file;
  }

  async getFileList(page = 1, listSize = 10) {
    const filesList = await files.findAll({
      limit: listSize,
      offset: (page - 1) * listSize,
    });

    return filesList;
  }
}

module.exports = new FileService();
