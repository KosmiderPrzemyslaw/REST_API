document.addEventListener("DOMContentLoaded", function () {
    const tbody = document.querySelector("tbody")

    function addBookToDom(book) {
        const row = document.createElement("tr")

        const title = document.createElement("td")
        title.innerText = book.title

        const author = document.createElement("td")
        author.innerText = book.author

        const publisher = document.createElement("td")
        publisher.innerText = book.publisher

        const bookId = book.id;
        const remove = document.createElement("td");
        remove.innerHTML = "<button id='remove' class='remove'>Remove</button>"

        const edit = document.createElement("td");
        edit.innerHTML = "<button id='edit' class='edit'>Edit</button>"



        // const button = $('.remove').find("button");


        row.appendChild(title)
        row.appendChild(author)
        row.appendChild(publisher)
        row.appendChild(remove)
        row.appendChild(edit)

        tbody.appendChild(row)

        // $(".remove").find("button").on("click", function (e) {
        //     e.preventDefault();
        //     alert("click")
        // })

        const table = $(".table");
        const button = table.find('button');
       // console.log(books);

        button.on("click", function () {

           $.ajax({
               url: "http://localhost:8282/books/" + book,
               type: "DELETE",
               dataType: "json",
               data: {
                   id: bookId
               },
               success: function (response) {
                   alert(response)
               },
               error: function (response) {
                   console.log(response);
               }
           })
        })

    }


    var button = document.querySelector('button');
    var title = document.querySelector('#title');
    var author = document.querySelector('#author');
    var publisher = document.querySelector('#publisher');


    button.addEventListener("click", function (event) {
        event.preventDefault()
        const formBook = {
            // isbn: isbnForm.value,
            title: title.value,
            author: author.value,
            publisher: publisher.value,
            id: book.id
            //type: typeForm.value
        }

        $.post({
            url: "http://localhost:8282/books",
            data: JSON.stringify(formBook),
            headers: {
                'Content-Type': 'application/json'
            }
        }).done(() => {
            console.log("Książka dodana!")
        }).fail(() => {
            console.log("Nie udało się dodać książki")
        })
        addBookToDom(formBook)
    })


    // ASYNCHRONICZNOŚĆ
    $.get({
        url: "http://localhost:8282/books"
    }).done(response => {
        response.forEach(addBookToDom)
    })

})