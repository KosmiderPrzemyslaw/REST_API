document.addEventListener("DOMContentLoaded", function () {


    const tbody = document.querySelector("tbody")
    const URL = "http://localhost:8282/books"

    function addBookToDom(book) {
        const row = document.createElement("tr")
        const title = document.createElement("td")
        const publisher = document.createElement("td")
        const removeButton = document.createElement("button");
        const author = document.createElement("td")
        const titleHref = document.createElement("a");
        const titleDiv = document.createElement("div");
        title.appendChild(titleHref);

        titleHref.dataset.id = book.id;
        titleHref.innerText = book.title;

        $(titleHref).css('cursor', 'pointer');

        titleDiv.className = ("hidden");
        removeButton.dataset.id = book.id;

        author.innerText = book.author;
        publisher.innerText = book.publisher;
        const removeTd = document.createElement("td");
        removeButton.innerText = "remove";
        removeButton.className = "remove";
        removeTd.appendChild(removeButton);

        titleHref.addEventListener("click", function () {
            $.getJSON({
                url: URL + `/${this.dataset.id}`,
            }).done(response => {
                console.log('response' + response);
                var book = JSON.parse(JSON.stringify(response));
                titleDiv.innerText = 'publisher: ' + book.publisher + '\n' +
                    'author: ' + book.author;
                titleDiv.classList.toggle("hidden")
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
        tbody.appendChild(titleDiv);

    }


    var button = document.querySelector('button');
    var title = document.querySelector('#title');
    var author = document.querySelector('#author');
    var publisher = document.querySelector('#publisher');


    $(button).on('click', function (event) {

        var title = $("#title").val();
        var author = $("#author").val();
        var publisher = $("#publisher").val();

        event.preventDefault()
        const formBook = {
            "title": title,
            "author": author,
            "publisher": publisher
        };

        $.post({
            url: URL,
            data: JSON.stringify(formBook),
            headers: {
                'Content-Type': 'application/json'
            }
        }).done(() => {
            history.go(0);
            console.log("Książka dodana!")
        }).fail(() => {
            console.log("Nie udało się dodać książki")
        })
        // addBookToDom(formBook)
    })


    // ASYNCHRONICZNOŚĆ
    $.get({
        url: URL
    }).done(response => {
        response.forEach(addBookToDom)
        console.log(response)
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
            history.go(0);
        });
    });

    var editElement = $('tbody')
    editElement.on('click', '.edit', function () {
        $.put()
        event.preventDefault();
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
            history.go(0);
            alert('PUT completed');
        });
    })
})