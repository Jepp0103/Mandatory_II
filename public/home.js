//Ajax call for getting the username
$.get("/username").done(data => { 
    $("#signedInAccount").text(data.response.username);
});