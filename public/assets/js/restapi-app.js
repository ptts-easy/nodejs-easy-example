
function fetch_api_click(url, method) {
  var get_params = "username=get_user&msg=get_hello";
  let post_params = {username: "post_user", msg:"post_hello"};

  if ((method.toUpperCase() == "GET") || (method.toUpperCase() == "HEAD")) {
    fetch(
      url + "?" + get_params, 
      {
        method: method,
        headers: {
          'Access-Control-Allow-Origin': '*',
  //      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
          'Content-Type': 'application/json;charset=UTF-8'
        }
      })
      .then(response => response.text())
      .then( html => show_restapi_response(html)
    );
  } else {
    fetch(
      url + "?" + get_params, 
      {
        method: method,
        headers: {
          'Access-Control-Allow-Origin': '*',
  //      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
          'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(post_params)
      })
      .then(response => response.text())
      .then( html => show_restapi_response(html)
    );
  }
}

function show_restapi_response(html) {
  $("#api_resp").html(html);
}