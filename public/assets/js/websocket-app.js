const socket_server_address = "localhost:18030"

var g_socket = undefined;
var g_username = "";

$(document).ready(function() {
    $('#btn_connect').on('click', installSocket);
});

function installSocket() {

  if (g_socket != undefined) {
    uninstallSocket();
  }

  g_socket = io(socket_server_address, {path: "/chat/socket.io", transports: ['websocket', 'polling', 'flashsocket']});

  g_socket.on('connect', handleConnect);
  g_socket.on('connecting', handleConnecting);
  g_socket.on('disconnect', handleDisconnect);
  g_socket.on('connect_failed', handleConnect_failed);
  g_socket.on('error', handleError);
  g_socket.on('message', handleMessage);
  g_socket.on('reconnect', handleReconnect);
  g_socket.on('reconnecting', handleReconnecting);
  g_socket.on('reconnect_failed', handleReconnect_failed);

  g_socket.on('username', recvUsername);
  g_socket.on('update_users', recvUserList);
  g_socket.on('custom_error', recvCustomError);
  g_socket.on('custom_message', recvCustomMessage);

  g_socket.on('system_message', recvSysMessage);

  $('#btn_connect').on('click', uninstallSocket);
  $('#btn_connect').removeClass('btn-primary');
  $('#btn_connect').addClass('btn-warning');
  $('#btn_connect').text("Disconnect ...");
}

function uninstallSocket() {
  if (g_socket != undefined) {
    g_socket.close();
  }

  g_socket = undefined;
  $('#btn_connect').on('click', installSocket);
  $('#btn_connect').removeClass('btn-warning')
  $('#btn_connect').addClass('btn-primary');
  $('#btn_connect').text("Connect ...");
}

function recvSysMessage(msg) {
  console.log("recvSysMessage::",msg);
  const message = msg.message;

﻿  let recv_msg = document.getElementById('recv_msg');

  formed_msg = `<div style="color:red;;">${message}</div>`;
  recv_msg.innerHTML += formed_msg;
}

function recvCustomMessage(msg) {

  const sender = msg.username;
  const message = msg.message;

﻿  let recv_msg = document.getElementById('recv_msg');

  let formed_msg = "";

  if (g_username == sender) {
    formed_msg = `<div style="text-align:right;"><b>${sender}</b><br>${message}&nbsp;&nbsp;&nbsp;&nbsp;</div>`;
  } else {
    formed_msg = `<div style="text-align:left;"><b>${sender}</b><br>&nbsp;&nbsp;&nbsp;&nbsp;${message}</div>`;
  }

  recv_msg.innerHTML += formed_msg;
}

function recvUsername(username) {
   g_username = username;
   document.getElementById('user_name').value = username;
}

function recvCustomError(message) {
   console.log(`%c${message.type} `, "color:red", message.data);
   alert(message.data);
}

function recvUserList(username_list) {

   const old_recverlist = getRecvers();

   let html_userlist = "";

   for (let user_item of username_list) {

      const user_id = `${user_item.roomname}::${user_item.username}`;
      let input_value, input_check;

      let html_username;

      if (user_item.roomname == "room") {
         input_value = "room";
      } else if (user_item.username == "*") {
         input_value = "*";
      } else {
         input_value = user_item.username;
      }

      if (old_recverlist.indexOf(input_value) >= 0) {
         input_check = "checked";
      } else {
         input_check = "";
      }

      html_username= `<li class="list-group-item">
                        <input type="checkbox" class="form-check-input" id="${user_id}" name="${user_id}" value="${input_value}" ${input_check}>
                        <label class="form-check-label" for="${user_id}">${user_id}</label>
                     </li>`;

      html_userlist += html_username;
   }

   document.getElementById('user_list').innerHTML = html_userlist;
}

function changeUsername() {
   if (g_socket != undefined) {
      const username = document.getElementById('user_name').value;
      g_socket.emit('change_username', username);
   }
}

function joinRoom() {
   if (g_socket != undefined) {   
      const roomname = document.getElementById('room_name').value;
      g_socket.emit('join_room', roomname);
   }
}

function getRecvers() {
   const user_list = document.getElementById('user_list');

   const users = user_list.getElementsByTagName('input'); 

   const recvers = [];

   for (let key in users) {
      const user = users[key];
      if (user.checked == true) {
         recvers.push(user.value);
      }
   }

   return recvers;
}

function sendMessage() {
   if (g_socket != undefined) {
      const msg = document.getElementById('send_msg').value;

      if (msg == "") {
         alert("to send message is empty.");
         return;
      }

      const recvers = getRecvers();

      g_socket.emit('custom_msg', {recvers:recvers, msg:msg});
   }
}

function clearMessage() {
  document.getElementById('recv_msg').innerHTML = "";
}