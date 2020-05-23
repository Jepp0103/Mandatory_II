//Ajax call for getting the username
const courseRegex = /\course/g


$.get("/myElectives").done(data => { 
    $("#myElectives").text(data.response);
});