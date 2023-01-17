
function handleConnect() {
    console.log("%cSocket.io %s", "color:blue", "Connect ...");
}

function handleConnecting() {
    console.log("%cSocket.io %s", "color:blue", "Connecting ...");
}

function handleDisconnect() {
    console.log("%cSocket.io %s", "color:red", "Disconnect ...");
}

function handleConnect_failed() {
    console.log("%cSocket.io %s", "color:red", "Connect_failed ...");
}

function handleError() {
    console.log("%cSocket.io %s", "color:red", "Error ...");
}

function handleMessage() {
    console.log("%cSocket.io %s", "color:green", "Message ...");
}

function handleReconnect() {
    console.log("%cSocket.io %s", "color:blue", "Reconnect ...");
}

function handleReconnecting() {
    console.log("%cSocket.io %s", "color:blue", "Reconnecting ...");
}

function handleReconnect_failed() {
    console.log("%cSocket.io %s", "color:red", "Reconnecting ...");
}
