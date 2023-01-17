const { ServiceChatting } = require("./chatting/app.js");
const { ServiceUploadSingleFile, ServiceUploadMultiFile, ServiceShowStorage, ServiceClearStorage } = require("./filestorage/app.js");
const { ApiGetHandler, ApiPostHandler, ApiPutHandler, ApiDeleteHandler, ApiPatchHandler, ApiHeadHandler, ApiOptionsHandler }= require("./RESTApi/app.js");

module.exports = { ServiceChatting, ServiceUploadSingleFile, ServiceUploadMultiFile, ServiceShowStorage, ServiceClearStorage, ApiGetHandler, ApiPostHandler, ApiPutHandler, ApiDeleteHandler, ApiPatchHandler, ApiHeadHandler, ApiOptionsHandler };