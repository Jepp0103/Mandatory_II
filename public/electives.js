//Ajax call for getting the username
$.get("/myElectives").done(data => { 
    $("#myElectives").text(data.response);
});