const { IndexGetHandler, HelloGetHandler, TemplateGetHandler, RouteDefaultGetHandler, RouteGetHandler } = require("./homeController.js");
const { FileuploadGetHandler } = require("./fileuploadController.js");
const { HTTPHandler, HTTPInfoHandler } = require("./httpController.js");
const { RestApiGetHandler, RestApiMsgHandler } = require("./restapiController.js");
const { LoginGetHandler, LoginPostHandler, LogoutGetHandler } = require("./authController.js");
const { DashboardGetHandler } = require("./dashboardController.js");
const { WebsocketGetHandler } = require("./websocketControlller.js");
const { NLPGetHandler } = require("./nlpController.js");

module.exports = { 
    IndexGetHandler, 
    HelloGetHandler, 
    TemplateGetHandler, 
    RouteDefaultGetHandler, 
    RouteGetHandler, 

    FileuploadGetHandler, 

    HTTPHandler,
    HTTPInfoHandler,

    RestApiGetHandler, 
    RestApiMsgHandler,

    LoginGetHandler, 
    LoginPostHandler, 
    LogoutGetHandler,

    DashboardGetHandler, 

    WebsocketGetHandler,
    
    NLPGetHandler
    };