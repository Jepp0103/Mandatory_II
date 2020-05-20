//Ajax call for getting the username
$.get("/elective").done(data => { 
    $("#electives").text(data.response);
});