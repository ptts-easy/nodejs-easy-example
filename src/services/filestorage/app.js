const fs = require('fs');
const path = require('path');
const multer = require('multer');
const fsExtra = require('fs-extra');

function multer_storage(storage_path) {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, storage_path)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  return storage;
};

function multer_allowedFiles() {
  return (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(tif|pjp|apng|xbm|jxl|svgz|jpg|jpeg|ico|tiff|gif|svg|jfif|webp|png|bmp|pjpeg|avif)$/i)) {
        req.fileValidationError = 'Only tif|pjp|apng|xbm|jxl|svgz|jpg|jpeg|ico|tiff|gif|svg|jfif|webp|png|bmp|pjpeg|avif file type are allowed!';
        return cb(new Error('Only tif|pjp|apng|xbm|jxl|svgz|jpg|jpeg|ico|tiff|gif|svg|jfif|webp|png|bmp|pjpeg|avif file type  are allowed!'), false);
    }
    cb(null, true);
  }
}

function ServiceUploadSingleFile(storage_path) {
  return (req, res, next) => {

    var upload = multer({
                storage: multer_storage(storage_path), 
                limits: { fileSize: 1000 * 1024 * 1024 }, // 1000 Mb
                fileFilter: multer_allowedFiles() 
                }).single('myfile');
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({error:err});
      } else if (err) {
        return res.status(500).json({error:err});
      }else{
        ServiceShowStorage(storage_path)(req, res, next);
      }
    });
  }
}

function ServiceUploadMultiFile(storage_path) {
  return (req, res, next) => {

    var upload = multer({
                storage: multer_storage(storage_path), 
                limits: { fileSize: 10 * 1024 * 1024 * 1024 }, // 10 Gb
                }).array('myfiles');
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({error:err});
      } else if (err) {
        return res.status(500).json({error:err});
      }else{
        ServiceShowStorage(storage_path)(req, res, next);
      }
    });
  }
}

function ServiceShowStorage(storage_path) {
   return (req, res, next) => {

      let file_list = [];

      fs.readdirSync(storage_path).forEach(file => {
        file_list.push(file);
      });

      let dir_info = [];

      for (let file of file_list) { 
        let one_info = {};
        let abs_path = storage_path + file;
        let state = fs.statSync(abs_path);

        one_info["extension"] = path.extname(abs_path);
        one_info["basename"] = path.basename(abs_path);
        one_info["filename"] = path.basename(abs_path, one_info["extension"]);
        one_info["state"] = state.isDirectory() ? "dir" : state.isFile() ? "file" : state.isSymbolicLink() ? "link" : "unknown";
        one_info["size"] = state.size;
        one_info["mode"] = state.mode;
        one_info["nlink"] = state.nlink;
        one_info["atime"] = state.atime;        
        one_info["mtime"] = state.mtime;
        one_info["ctime"] = state.ctime;
        one_info["birthtime"] = state.birthtime;

        dir_info.push(one_info);
      }

      res.status(200).json(dir_info);
   }
}

function ServiceClearStorage(storage_path) {
  return (req, res, next) => {

    fsExtra.emptyDirSync(storage_path);
    ServiceShowStorage(storage_path)(req, res, next);
  }
}

module.exports = { ServiceUploadSingleFile, ServiceUploadMultiFile, ServiceShowStorage, ServiceClearStorage };