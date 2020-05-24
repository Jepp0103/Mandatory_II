//Ajax call for getting and displaying the username on the web page
$.get("/username").done(data => { 
    $("#signedInUsername").text(data.response.username);
});