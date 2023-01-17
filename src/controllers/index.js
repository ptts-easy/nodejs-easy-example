const { LoginGetHandler, LoginPostHandler, LogoutGetHandler } = require("./authController.js");
const { IndexGetHandler, TemplateGetHandler, RouteDefaultGetHandler, RouteGetHandler } = require("./homeController.js");
const { DashboardGetHandler } = require("./dashboardController.js");
const { FileuploadGetHandler } = require("./fileuploadController.js");
const { HTTPHandler, HTTPInfoHandler } = require("./httpController.js");
const { RestApiGetHandler, RestApiMsgHandler } = require("./restapiController.js");
const { WebsocketGetHandler } = require("./websocketControlller.js");

module.exports = { 
    LoginGetHandler, 
    LoginPostHandler, 
    LogoutGetHandler,

    IndexGetHandler, 
    TemplateGetHandler, 
    RouteDefaultGetHandler, 
    RouteGetHandler, 
    DashboardGetHandler, 

    FileuploadGetHandler, 

    HTTPHandler,
    HTTPInfoHandler,

    RestApiGetHandler, 
    RestApiMsgHandler,

    WebsocketGetHandler
    };