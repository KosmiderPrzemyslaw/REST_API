$(document).ready(function () {
    getAllBooks();

    let dynamicUrl = "";
    let methodName = "";

    function printAllBooksFromDb(data, tableBody) {
        $(data).each(function (index, element) {
            tableBody.append('<tr><td>' + element.title + '</td><td>' + element.isbn + '</td><td>' + element.author + '</td><td>' +
                element.publisher + '</td><td>' + element.type + '</td><td>' + '<button id="' + element.id + '" class="deleteButton">Delete</td></button> </td><td>' + '<button id="' + element.id + '" class="updateButton">Update</td></button> </tr>');
        })
    }

    function getAllBooks() {
        $.ajax({
            url: "http://localhost:8282/books/",
            method: "GET",
            dataType: "json",
            success: function (data) {
                let tableBody = $('#datatable tbody');
                tableBody.empty();
                printAllBooksFromDb(data, tableBody);

            },
            error: function (error) {
                alert(error);
            }
        })
    }


    let book = {};
    $('#btnAddBook').on('click', function (e) {

        book.title = $('#title').val();
        book.author = $('#author').val();
        book.publisher = $('#publisher').val();
        book.isbn = $('#isbn').val();
        book.type = $('#type').val();
        book.id = $('#txtId').val();

        //let bookId = $('#txtId').val(); Dlaczego to nie działa

        let bookObj = JSON.stringify(book);

        if (book.id) {
            dynamicUrl = 'http://localhost:8282/books/' + book.id;
            methodName = "PUT";

        } else {
            dynamicUrl = 'http://localhost:8282/books/';
            methodName = 'POST';
        }


        $.ajax({
            url: dynamicUrl,
            method: methodName,
            data: bookObj,
            headers: {
                'Content-Type': 'application/json'
            }

        }).done(() => {
            alert("Data is saved succesfully");
            getAllBooks();
        }).fail(error => {
            alert(error)
        })
    });

    let tbody = $('#datatable tbody');

    tbody.on('click', '.deleteButton', function (element) {
        deleteBook(this.id);
    });


    function deleteBook(id) {
        $.ajax({
            url: 'http://localhost:8282/books/' + id,
            method: 'DELETE',
            success: function () {
                alert('record has been deleted');
                getAllBooks();
            },
            error: function (error) {
                alert(error);
            }
        })
    }

    tbody.on('click', '.updateButton', function () {
        updateBook(this.id);
    });

    function updateBook(id) {
        $.ajax({
            url: 'http://localhost:8282/books/' + id,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                $('#title').val(data.title);
                $('#isbn').val(data.isbn);
                $('#author').val(data.author);
                $('#publisher').val(data.publisher);
                $('#type').val(data.type);
                $('#txtId').val(data.id);

                getAllBooks();
            },
            error: function (error) {
                alert(error);
            }
        })
    }

    let clearForm = $('#clearForm');

    clearForm.on('click', function () {
        let emptyString = "";
        $('#txtId').val(emptyString);
        $('#title').val(emptyString);
        $('#isbn').val(emptyString);
        $('#author').val(emptyString);
        $('#publisher').val(emptyString);
        $('#type').val(emptyString);
    })


});
