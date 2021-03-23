document.addEventListener("DOMContentLoaded", function () {


    const tbody = document.querySelector("tbody")
    const URL = "http://localhost:8282/books"

    function addBookToDom(book) {
        const row = document.createElement("tr")
        const title = document.createElement("td")
        const publisher = document.createElement("td")
        const removeButton = document.createElement("button");
        const author = document.createElement("td")

        removeButton.dataset.id = book.id;
        title.innerText = book.title

        author.innerText = book.author
        publisher.innerText = book.publisher
        const removeTd = document.createElement("td");
        removeButton.innerText = "remove";
        removeButton.className = "remove";
        removeTd.appendChild(removeButton);

        removeButton.addEventListener("click", function () {
            $.getJSON({
                url: URL + `${this.dataset.id}`
            }).done(response => {
                console.log('response' + response);
                var book = JSON.parse(JSON.stringify(response));

            })
        })

        const editTd = document.createElement("td");
        const editButton = document.createElement("button")
        //editButton.dataset.id = book.id;
        editButton.setAttribute("id", book.id);
        editButton.innerText = "edit";
        editButton.className = "edit";

        editTd.appendChild(editButton);


        row.appendChild(title)
        row.appendChild(author)
        row.appendChild(publisher)
        row.appendChild(removeTd)
        row.appendChild(editTd)

        tbody.appendChild(row)

    }


    var button = document.querySelector('button');
    var title = document.querySelector('#title');
    var author = document.querySelector('#author');
    var publisher = document.querySelector('#publisher');


    $(button).on("click", function (event) {
        event.preventDefault()
        const formBook = {
            // isbn: isbnForm.value,
            title: title.value,
            author: author.value,
            publisher: publisher.value,

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

    var removeElement = $('tbody')
    console.log(removeElement)
    removeElement.on('click', '.remove', function () {
        var id = this.dataset.id;
        console.log(id);
        $.ajax({
            url: URL + "/" + id,
            method: "DELETE"
        }).done(() => {
            location.reload(false);
            //history.go(0);
        });
    });

    var editElement = $('tbody')
    editElement.on('click', '.edit', function () {
        event.preventDefault();
        var id = this.dataset.id;
        console.log(id)

        const formBook = {
            // isbn: isbnForm.value,
            title: title.value,
            author: author.value,
            publisher: publisher.value,

            //type: typeForm.value
        }

        $.ajax({
            url: 'http://localhost:8282/books/' + id,
            data: '{"id":"1","isbn":"11111", "title":"Thinking in Java"}'
            ,
            contentType: "application/json"
            ,
            method: "PUT"
        }).done(function () {
            alert('PUT completed');
        });
    })


})