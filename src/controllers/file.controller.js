const fileService = require("../services/file.service");

class FileController {
  async fileUpload(req, res, next) {
    const file = req.file;
    const fileInfo = await fileService.uploadFile(file);
    res.status(200).json(fileInfo);
  }

  async deleteFile(req, res, next) {
    const fileId = req.params.fileId;
    const fileInfo = await fileService.deleteFile(fileId);
    res.status(200).json(fileInfo);
  }

  async getFileInfo(req, res, next) {
    const fileId = req.params.fileId;
    const fileInfo = await fileService.getFileInfo(fileId);
    res.status(200).json(fileInfo);
  }
  async updateFile(req, res, next) {
    const file = req.file;
    const fileId = req.params.fileId;
    const fileInfo = await fileService.updateFile(file, fileId);
    res.status(200).json(fileInfo);
  }
  async downloadFile(req, res, next) {
    const fileId = req.params.fileId;
    const filePath = await fileService.getFilePath(fileId);
    res.status(200).download(filePath);
  }
  async fileList(req, res) {
    let { listSize = 10, page = 1 } = req.query;
    page = parseInt(req.query.page) || 1;
    listSize = parseInt(req.query.list_size) || 10;

    try {
      const fileList = await fileService.getFileList(page, listSize);
      res.json(fileList);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

module.exports = new FileController();
