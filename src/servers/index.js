const { RunHttpServer } = require("./httpServer.js");
const { RunApiServer } = require("./restapiServer.js");
const { RunUploadServer } = require("./fileuploadServer.js");
const { RunWSServer } = require("./websocketServer.js");

module.exports = { RunHttpServer, RunApiServer, RunUploadServer, RunWSServer };