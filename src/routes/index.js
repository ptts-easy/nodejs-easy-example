const middleware = require('../middleware/authRequired.js');
const controllers = require('../controllers/index.js');
const express = require('express');
const router = express.Router();

function PublicRoutes() {

    router.get('/', controllers.IndexGetHandler());
    router.get('/template', controllers.TemplateGetHandler());

    router.get('/route', controllers.RouteDefaultGetHandler());
    router.get('/route/:name/:action*', controllers.RouteGetHandler());
    router.get('/fileupload', controllers.FileuploadGetHandler());

    router.get('/http', controllers.HTTPHandler());
    router.route('/http/info')
        .get(controllers.HTTPInfoHandler())
        .post(controllers.HTTPInfoHandler())
        .put(controllers.HTTPInfoHandler())
        .delete(controllers.HTTPInfoHandler())
        .patch(controllers.HTTPInfoHandler())
        .head(controllers.HTTPInfoHandler())
        .options(controllers.HTTPInfoHandler());

    router.get('/restapi', controllers.RestApiGetHandler());
    router.all('/rest/:name*', controllers.RestApiMsgHandler());

    router.get('/login', controllers.LoginGetHandler());
    router.post('/login', controllers.LoginPostHandler());
}

function PrivateRoutes() {

    router.use('/logout', middleware.AuthRequired(), controllers.LogoutGetHandler());
//    router.use('/logout', middleware.AuthRequired());
//    router.get('/logout', controllers.LogoutGetHandler());
    router.use('/dashboard', middleware.AuthRequired());
    router.get('/dashboard', controllers.DashboardGetHandler());
//    router.use('/websocket', middleware.AuthRequired());
    router.get('/websocket', controllers.WebsocketGetHandler());
}

module.exports = { router, PublicRoutes, PrivateRoutes };