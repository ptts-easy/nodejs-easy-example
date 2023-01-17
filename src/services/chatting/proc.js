
users = {};
roomnames = {};

let user_uid = 0;

function getUsernameList() {
  let username_list = [];

  username_list.push({roomname:"*", username:"*"});
  username_list.push({roomname:"room", username:"*"});

  for (let username in users) {
    let roomname;

    if (roomnames[username] == undefined) {
      roomname = "";
    } else {
      roomname = roomnames[username];
    }

    username_list.push({roomname:roomname, username:username});
  }

  return username_list;
}

function boardcastUsers(sockets) {
  const username_list = getUsernameList();

  sockets.emit('update_users', username_list);
}

function initUserConnect(sockets, socket) {
  user_uid ++;

  let username = `user_${user_uid}`;

  users[username] = socket;

  console.log("\x1b[34m%s\x1b[0m", username, "connected");

  socket.emit('username', username);

  sockets.emit('system_message', {message:username + " connected !!!"});

  boardcastUsers(sockets);

  return username;
}

function releaseUserConnect(sockets, socket, username) {

  console.log("\x1b[31m%s\x1b[0m", "Disconnect ", username, " ...");

  delete users[username];
  delete roomnames[username];

  sockets.emit('system_message', {message:username + " disconnected !!!"});

  boardcastUsers(sockets);

  return username;
}

function changeUsername(sockets, socket, username, new_username) {

  if(username == new_username) {
    return username;
  }

  if(new_username == "*" || new_username == "room" || users[new_username] != undefined){

    socket.emit('custom_error', {type:'user_exists', data:(new_username + ' is taken! Try some other username.')});

    return username;

  } else {

    delete users[username];

    users[new_username] = socket;

    socket.emit('username', new_username);
    
    console.log("\x1b[34m%s\x1b[0m", new_username, "updated.");

    boardcastUsers(sockets);

    sockets.emit('system_message', {message:username + " changed " + new_username});

    return new_username;
  }
}

function joinRoom(sockets, socket, username, roomname) {

  if(roomname == "room"){

    socket.emit('custom_error', {type:'room_invalid', data:(roomname + ' is invalid!')});

    return username;

  } else {
    socket.join(roomname);

    const oldroomname = roomnames[username];

    if (oldroomname == roomname) {
      return;
    }

    if (oldroomname != undefined) {
      sockets.in(oldroomname).emit('system_message', {message:username + " has leaved in " + oldroomname});
    }

    roomnames[username] = roomname;

    console.log("\x1b[34m%s\x1b[0m", "joinRoom ", roomname, " ...");

    boardcastUsers(sockets);

    //Send this event to everyone in the room.
    sockets.in(roomname).emit('system_message', {message:username + " has joined in " + roomname});
  }
}

function boardcastMessage(sockets, username, msg) {
  sockets.emit('custom_message', {username:username, message:msg});
}

function roomMessage(sockets, username, msg) {

  if (roomnames[username] != undefined) {
    sockets.in(roomnames[username]).emit('custom_message', {username:username, message:msg});
  }
}

function sendMessage(recvers, username, msg) {

  for (let recver of recvers) {
    const socket = users[recver];

    if (socket != undefined) {
      socket.emit('custom_message', {username:username, message:msg});
    }
  }
}

function recvMsg(sockets, socket, username, msg) {
  console.log("\x1b[31m%s\x1b[0m", "recvMsg ...", username, msg);

  const recvers = msg.recvers;
  const message = msg.msg;

  if (recvers.indexOf("*") >= 0) {
    boardcastMessage(sockets, username, message);
  }  else if (recvers.indexOf("room") >= 0){
    roomMessage(sockets, username, message);
  } else {
    if (recvers.indexOf(username) < 0) {
      recvers.push(username);
    }
    sendMessage(recvers, username, message);
  }
}

module.exports = {
  initUserConnect, 
  releaseUserConnect,
  changeUsername, 
  joinRoom, 
  recvMsg
};