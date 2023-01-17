function xhr_method_click(url, method) {
  let xhr = new XMLHttpRequest();
  var get_params = "username=get_user&msg=get_hello";
  let post_params = {username:"post_user", msg:"post_hello"};

  xhr.open(method, url + "?" + get_params);

//  xhr.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').content);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

  xhr.onload = () => {
    if (xhr.status != 200) { 
      console.log(`onload::error ${xhr.status}: ${xhr.statusText}`);
    } else {
      show_response(JSON.parse(xhr.response));
    }
  };

  xhr.onreadystatechange = function() {//Call a function when the state changes.
    if(xhr.readyState == 4 && xhr.status == 200) {
//      console.log(`onreadystatechange ${xhr.status}: ${xhr.readyState} : ${xhr.responseText}`);
    }
 }

  xhr.onprogress = (event) => console.log("xhr.onprogress::", event.loaded);

  xhr.onerror = () => console.log("Request failed");

  xhr.send(JSON.stringify(post_params));
}

function fetch_method_click(url, method) {
  var get_params = "username=get_user&msg=get_hello";
  let post_params = {username: "post_user", msg:"post_hello"};

  if ((method.toUpperCase() == "GET") || (method.toUpperCase() == "HEAD")) {
    fetch(
      url + "?" + get_params, 
      {
        method: method,
        headers: {
  //      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
          'Content-Type': 'application/json;charset=UTF-8'
        }
      })
      .then(response => response.json())
      .then( json => show_response(json)
    );
  } else {
    fetch(
      url + "?" + get_params, 
      {
        method: method,
        headers: {
  //      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
          'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(post_params)
      })
      .then(response => response.json())
      .then( json => show_response(json)
    );
  }
}

function jquery_ajax_method_click(url, method) {
  var get_params = "username=get_user&msg=get_hello";
  let post_params = {username: "post_user", msg:"post_hello"};

'application/json;charset=UTF-8'

  if (method.toUpperCase() == "GET"){
    $.get(url, get_params, function(result) {
      show_response(result);
    });
  } else {
    $.ajax({
      type: method,
      url: url + "?" + get_params, 
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data: JSON.stringify(post_params),
//      beforeSend: function(xhr){xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');},
      success: function(result){
        show_response(result);
      }
    });
  }
}

function axios_method_click(url, method) {
  var get_params = {username: "get_user", msg:"get_hello"};
  let post_params = {username: "post_user", msg:"post_hello"};

  axios(url, {
    url: url,
    method: method,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: get_params,
    data: post_params,
    timeout: 1000, // default is `0` (no timeout)
    auth: {
      username: 'user123',
      password: 'pw123'
    },
    responseType: 'json', // default
    responseEncoding: 'utf8', // default
    xsrfCookieName: 'XSRF-TOKEN', // default
    xsrfHeaderName: 'X-XSRF-TOKEN', // default
    onUploadProgress: function (progressEvent) {
      console.log("onUploadProgress::", progressEvent);
    },
    onDownloadProgress: function (progressEvent) {
      console.log("onDownloadProgress::", progressEvent);
    }
  })
  .then(function (response) {
    show_response(response.data);
  });
}

function show_response(resp) {
  $("#ip").text(resp["ip"]);
  $("#method").text(resp["method"]);
  $("#url").text(resp["url"]);
  $("#get_param").text(JSON.stringify(resp["get_param"]));
  $("#post_param").text(JSON.stringify(resp["post_param"]));
  $("#header").text(JSON.stringify(resp["header"]));
  $("#body").text(JSON.stringify(resp["body"]));

  if (resp["header"] != undefined) {
    let header = resp["header"];
    $("#useragent").text(header["user-agent"]);
  }
}