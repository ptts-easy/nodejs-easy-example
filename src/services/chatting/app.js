
const {
   handleServerConnection,
   handleServerError,
   handleServerConnect,
   handleServerConnectError,
   handleServerDisconnect,
   handleServerDisconnecting,
   handleServerNewListener,
   handleServerRemoveListener,

   handleSocketConnect,
   handleSocketConnecting,
   handleSocketDisconnect,
   handleSocketConnect_failed,
   handleSocketError,
   handleSocketMessage,
   handleSocketReconnect,
   handleSocketReconnecting,
   handleSocketReconnect_failed
} = require('./error');

const {
   initUserConnect,
   releaseUserConnect,
   changeUsername,
   joinRoom,
   recvMsg
} = require('./proc');

function ServiceChatting(server) {

   server.on('connection', function(socket){
      
      console.log("WS connectioned !!!");

      let username = "";

      username = initUserConnect(server.sockets, socket);

      socket.on('change_username', function(data){ username = changeUsername(server.sockets, socket, username, data);});
      socket.on('join_room', function(data){ joinRoom(server.sockets, socket, username, data);});
      socket.on('custom_msg', function(data){ recvMsg(server.sockets, socket, username, data);});

      socket.on('connect', handleSocketConnect);
      socket.on('connecting', handleSocketConnecting);
//      socket.on('disconnect', handleSocketDisconnect);
      socket.on('disconnect', function(data){ releaseUserConnect(server.sockets, socket, username);});
      socket.on('connect_failed', handleSocketConnect_failed);
      socket.on('error', handleSocketError);
      socket.on('message', handleSocketMessage);
      socket.on('reconnect', handleSocketReconnect);
      socket.on('reconnecting', handleSocketReconnecting);
      socket.on('reconnect_failed', handleSocketReconnect_failed);   
   });

   server.on('error', handleServerError);
   server.on('connect', handleServerConnect);
   server.on('connect_error', handleServerConnectError);
   server.on('disconnect', handleServerDisconnect);
   server.on('disconnecting', handleServerDisconnecting);
//   server.on('newListener', handleServerNewListener);
   server.on('removeListener', handleServerRemoveListener);
}

module.exports = { ServiceChatting };