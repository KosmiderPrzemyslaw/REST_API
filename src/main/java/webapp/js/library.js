$(document).ready(function () {
    const URL = "http://localhost:8282/books/";

    getAllBooks();
    let tableBody = $("#booksTable tbody");
    const divElement = document.createElement("div");
    divElement.className = ("hidden");


    $("#addBook").on('click', function (e) {

        book.title = $("#title").val();
        book.author = $("#author").val();
        book.publisher = $("#publisher").val();
        book.isbn = $("#isbn").val();
        book.type = $("#type").val();
        console.log(book);

        let bookOBJ = JSON.stringify(book);

        $.ajax({
            url: URL,
            method: "POST",
            data: bookOBJ,
            headers: {
                'Content-Type': 'application/json'
            }
        }).done(() => {
            alert("Data is saved sucesfuly");
            getAllBooks();
        }).fail(error => {
            alert(error)
        })
    });

    function printAllBooksFromDb(dataBookFromDb, tableBody) {
        $(dataBookFromDb).each(function (index, element) {
            tableBody.append('<tr><td><div class="title">' + element.title
                + '</div></td><td>' + element.author
                + '</td><td>' + element.publisher + '</td>'
                + '<td><button id= "' + element.id + '" class="deleteButton">Delete</button></td>'
                + '<td><button id="updateButton">Update</button> </td></tr>')
        })
    }

    function getAllBooks() {

        $.ajax({
            url: URL,
            method: "GET",
            dataType: "json",
        }).done((dataBookFromDB) => {
            let tbody = $("#datatable tbody")
            tbody.empty();

            printAllBooksFromDb(dataBookFromDB, tableBody)
        }).fail(error => {
            alert(error)
        })

    }

    $(tableBody).on('click', 'div', function (e) {

        $.getJSON({
            url: URL + `${this.id}`
        }).done(response => {
            this.appendChild(divElement);
            let book = JSON.parse(JSON.stringify(response));
            divElement.innerText = 'Type: ' + book.type + "\n" + 'ISBN: ' + book.isbn;
            divElement.classList.toggle("hidden");

        })
    });


    let book = {};



    tableBody.on('click', '.deleteButton', function () {

        let bookID = $('#bookId');
        console.log(bookID);
        deleteBook(this.id);
    });

    function deleteBook(bookId) {
        $.ajax({
            url: URL + bookId,
            method: "DELETE",
        }).done(function () {
            alert("Book has been deleted");
            tableBody.empty();
            getAllBooks();
        }).fail(function (error) {
            alert(error);
        })
    }

    $('#clearForm').on('click', function () {
        $('#title').val("");
        $('#author').val("");
        $('#publisher').val("");
        $('#isbn').val("");
        $('#type').val("");
        //$('#txtId').val("");
    });

    function updateBook(id) {

    }
});