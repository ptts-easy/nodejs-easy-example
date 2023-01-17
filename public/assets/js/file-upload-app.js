const upload_server_address = "http://localhost:18020"

$(document).ready(function() {
    $('#myUploadSingleFile').on('click', upload_single_file);
    $('#myUploadMultiFiles').on('click', upload_multi_files);
    $('#showStorage').on('click', show_storage);
    $('#clearStorage').on('click', clear_storage);
});

function upload_single_file() {
  let upload_url = upload_server_address + "/upload_single";

  if ($('#formSingleFile')[0].files.length < 1) {
    alert("select one more files !!!");
    return;
  }

  $.ajax({
    url: upload_url,
    type: 'POST',
    headers: {  'Access-Control-Allow-Origin': '*' },
//    crossDomain: true,

    // Form data
    data: new FormData($('form')[0]),

    // Tell jQuery not to process data or worry about content-type
    // You *must* include these options!
    cache: false,
    contentType: false,
    processData: false,
    }).done(function(json){
      show_file_list(json);
      $('#formSingleFile')[0].value = null;
    }).fail(function(error){
      console.log("An error occurred :: " + JSON.stringify(error));
    });
}

function upload_multi_files() {
  let upload_url = upload_server_address + "/upload_multi";

  if ($('#formMultiFile')[0].files.length < 1) {
    alert("select one more files !!!");
    return;
  }

  $.ajax({
    url: upload_url,
    type: 'POST',
    headers: {  'Access-Control-Allow-Origin': '*' },
//    crossDomain: true,

    // Form data
    data: new FormData($('form')[1]),

    // Tell jQuery not to process data or worry about content-type
    // You *must* include these options!
    cache: false,
    contentType: false,
    processData: false,
    }).done(function(json){
      show_file_list(json);
//      document.querySelector('#formMultiFile').value = '';
//      document.getElementById('formMultiFile').value = [];
      $('#formMultiFile')[0].value = null;
    }).fail(function(error){
      console.log("An error occurred :: " + JSON.stringify(error));
    });
}

function show_storage() {
  let storage_url = upload_server_address + "/show_storage";

  $.ajax({
    url: storage_url,
    type: 'POST',
    headers: {  'Access-Control-Allow-Origin': '*' },
    // Tell jQuery not to process data or worry about content-type
    // You *must* include these options!
    cache: false,
    contentType: false,
    processData: false,
    })
    .done(show_file_list)
    .fail(function(error){
      console.log("An error occurred :: " + JSON.stringify(error));
    });
}

function clear_storage() {
  let storage_url = upload_server_address + "/clear_storage";

  $.ajax({
    url: storage_url,
    type: 'POST',
    headers: {  'Access-Control-Allow-Origin': '*' },
    // Tell jQuery not to process data or worry about content-type
    // You *must* include these options!
    cache: false,
    contentType: false,
    processData: false,
    })
    .done(show_file_list)
    .fail(function(error){
      console.log("An error occurred :: " + JSON.stringify(error));
    });
}

function show_file_list(json) {
  let dir_info = "<br>";
  for (let file of json) { 
    dir_info += `<p>${file["basename"]}, ${file["size"]}, ${file["birthtime"]}</p>`;
  }
  $("#storage").html(dir_info);
}