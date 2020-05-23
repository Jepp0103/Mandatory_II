//Ajax call for getting the username
$.get("/username").done(data => { 
    $("#signedInUsername").text(data.response.username);
});