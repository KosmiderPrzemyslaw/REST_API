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


        const removeTd = document.createElement("td");
        const removeButton = document.createElement("button");
        removeButton.dataset.id = book.id;
        removeButton.innerText = "remove";
        removeButton.className = "remove";

        removeTd.appendChild(removeButton);

        const edit = document.createElement("td");

        edit.innerHTML = "<button id='edit' class='edit'>Edit</button>"



        row.appendChild(title)
        row.appendChild(author)
        row.appendChild(publisher)
        row.appendChild(removeTd)
        row.appendChild(edit)

        tbody.appendChild(row)

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
        console.log('product clicked');
        var id = this.dataset.id;
        console.log(id);
        $.ajax({
            url: "http://localhost:8282/books" + "/" + id,
            method: "DELETE"
        }).done(() => {
            history.go(0);
        });
    });
})