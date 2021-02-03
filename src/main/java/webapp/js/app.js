$(function () {
    console.log("works")


});
// $.ajax({
//     url: "http://localhost:8282/books",
//     data: {},
//     type: "GET",
//     dataType: "json"
// }).done(function (json) {
//     $("<h1>").text(json.id).appendTo("body");
//     $("<h1>").text(json.isbn).appendTo("body");
//     $("<h1>").text(json.title).appendTo("body");
//     $("<h1>").text(json.author).appendTo("body");
//     $("<h1>").text(json.publisher).appendTo("body");
//     $("<div class=\"content\">").html(json.html).appendTo("body");
// }).fail(function (xhr, status, err) {
//     alert("Sory, there was a problem!");
//     console.log("Error: " + err);
//     console.log("Status: " + status);
//     console.dir(xhr);
// }).always(function (xhr, status) {
//     alert("The request is complete");
// });

// $.get({
//     url: "http://localhost:8282/books",
//     data:{},
//     dataType: "json"
//
// }).done(function (json) {
//     $("body").append("id: " + json.id);
//     $("body").append(" <br> author: " + json.author);
//     $("<h1>").text(json.id).appendTo("body");
//     $("<h1>").text(json.isbn).appendTo("body");
// }).fail(function (xhr, status, err) {
//     alert("Sorry there was a problem")
// });

$.getJSON("http://localhost:8282/books", function (resp) {
   console.log(resp);
});



