const fs = require('fs');

async function listDir(path) {
  console.log("listDir :: ", path);

//  await fs.readdir(path, (err, files) => {
//    console.log(files);
//    files.forEach(file => {
//      console.log(file);
//    });
//  });

  fs.readdirSync(path).forEach(file => {
    console.log(file);
  });
}

async function isExistFile(path) {
  console.log("isExistFile :: ", path);

  return await fs.existsSync(path);
}

async function createFile(path) {
  console.log("createFile (Empty File) :: ", path);

  await fs.open(path, 'w', function (err, file) {
    if (err) throw err;
    console.log('Saved!');
  });
}

async function readFile(path) {
  console.log("readFile :: ", path);

  await fs.readFile(path, function(err, data) {
    console.log(data);
  });
}

async function appendFile(path, addData) {
  console.log("appendFile :: ", path);

  await fs.appendFile(path, addData, function (err) {
    if (err) throw err;
    console.log('Updated!');
  });
}

async function writeFile(path, data) {
  console.log("writeFile :: ", path);

  fs.writeFile(path, data, function (err) {
    if (err) throw err;
    console.log('Replaced!');
  });
}

async function deleteFile(path) {
  console.log("deleteFile :: ", path);

  await fs.unlink(path, function (err) {
    if (err) throw err;
    console.log('File deleted!');
  });
}

async function renameFile(oldPath, newPath) {
  console.log("renameFile :: ", oldPath, "=>", newPath);

  await fs.rename(oldPath, newPath, function (err) {
    if (err) throw err;
    console.log('File Renamed!');
  });
}

async function readStrFile(path) {
  console.log("readStrFile :: ", path);

  let retText = "";

  await fs.readFile(path, 'utf8', function(err, data) {
    if (err) throw err;
    retText = data;
    console.log(retText);
  });
  console.log(retText);
  return retText;
/*  
  try {
//    const buff = fs.readFileSync(path, 'utf8');
    const buff = fs.readFileSync(path);
    console.log("readFileSync Complate");
    console.log(buff);
    console.log(buff.toString());
    return buff;
  } catch (err) {
    console.log("readFileSync Failed");
    console.error(err)
    return "";
  }
*/
}

module.exports = {
  listDir,
  isExistFile,
  createFile,
  readFile,
  appendFile,
  writeFile,
  deleteFile,
  renameFile,
  readStrFile
};