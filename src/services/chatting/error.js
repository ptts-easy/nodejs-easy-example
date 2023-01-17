function handleServerConnection(socket) {
    console.log("\x1b[34m%s\x1b[0m", "Server Connection ...");
}

function handleServerError(socket) {
    console.log("\x1b[34m%s\x1b[0m", "Server Error ...");
}

function handleServerConnect(socket) {
    console.log("\x1b[31m%s\x1b[0m", "Server Connect ...");
}

function handleServerConnectError(socket) {
    console.log("\x1b[31m%s\x1b[0m", "Server Connect Error ...");
}

function handleServerDisconnect(socket) {
    console.log("\x1b[31m%s\x1b[0m", "Server Disconnect ...");
}

function handleServerDisconnecting(socket) {
    console.log("\x1b[32m%s\x1b[0m", "Server Disconnecting ...");
}

function handleServerNewListener(data) {
    console.log("\x1b[34m%s\x1b[0m", "Server NewListener ...");
}

function handleServerRemoveListener(data) {
    console.log("\x1b[34m%s\x1b[0m", "Server RemoveListener ...");
}

function handleSocketConnect(data) {
    console.log("\x1b[34m%s\x1b[0m", "Socket Connect ...");
}

function handleSocketConnecting(data) {
    console.log("\x1b[34m%s\x1b[0m", "Socket Connecting ...");
   console.log("Connecting ...");
}

function handleSocketDisconnect(data) {
    console.log("\x1b[31m%s\x1b[0m", "Socket Disconnect ...");
}

function handleSocketConnect_failed(data) {
    console.log("\x1b[31m%s\x1b[0m", "Socket Connect Failed ...");
}

function handleSocketError(data) {
    console.log("\x1b[31m%s\x1b[0m", "Socket Error ...");
}

function handleSocketMessage(data) {
    console.log("\x1b[32m%s\x1b[0m", "Socket Message ...");
}

function handleSocketReconnect(data) {
    console.log("\x1b[34m%s\x1b[0m", "Socket Reconnect ...");
}

function handleSocketReconnecting(data) {
    console.log("\x1b[34m%s\x1b[0m", "Socket Reconnecting ...");
}

function handleSocketReconnect_failed(data) {
    console.log("\x1b[31m%s\x1b[0m", "socket Reconnect_failed ...");
}

module.exports = {
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
};