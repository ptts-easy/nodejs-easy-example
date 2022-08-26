const http = require('http');
const url = require('url');
const fs = require('fs');
const formidable = require('formidable');

async function createHttpServer(port) {
  console.log("createHttpServer :: ", port);
  //create a server object:
  await http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Hello World!'); //write a response to the client
    res.write('<br>');
    res.write(req.url);
    res.write('<br>');
    res.write('Input url:http://localhost:8080/?year=2017&month=July'); //write a response to the client
    res.write('<br>');
    let q = url.parse(req.url, true);

    console.log("host : ", q.host); //returns 'localhost:8080'
    console.log("pathname : ", q.pathname); //returns '/default.htm'
    console.log("search : ", q.search); //returns '?year=2017&month=february'
    console.log("query : ", q.query); //returns an object: { year: 2017, month: 'february' }

    var qdata = q.query;

    let txt = qdata.year + " " + qdata.month;
    res.end(txt);    
//    res.end(); //end the response
  }).listen(port); //the server object listens on port 8080
}

async function createFileServer(port) {
  console.log("createFileServer :: ", port);
  //create a server object:
  await http.createServer(function (req, res) {
    fs.readFile('demofile1.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
  }).listen(port); //the server object listens on port 8080
}

async function uploadFileServer(port) {
  console.log("uploadFileServer :: ", port);
  //create a server object:
  await http.createServer(function (req, res) {
    if (req.url == '/fileupload') {
      var form = new formidable.IncomingForm();
      form.parse(req, function (err, fields, files) {
        let oldpath = files.filetoupload.filepath;
        let newpath = '/storage/' + files.filetoupload.originalFilename;
        console.log(oldpath, "=>", newpath);
//        fs.rename(oldpath, newpath, function (err) {
//          if (err) throw err;
//          res.write('File uploaded and moved!');
//          res.end();
//        });
        res.write('File uploaded');
        res.end();
      });
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
      res.write('<input type="file" name="filetoupload"><br>');
      res.write('<input type="submit">');
      res.write('</form>');
      return res.end();
    }
  }).listen(port); //the server object listens on port 8080
}

module.exports = {
  createHttpServer,
  createFileServer,
  uploadFileServer
};