
package pl.coderslab.rest;

import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;

import javax.validation.Valid;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/books")
public class BookService {

    private final List<Book> cList = MockBookList.getInstance();

    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Book> getAllBooks() {
        return cList;
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Book getBook(@PathParam("id") long id) {
        Optional<Book> match = cList.stream().filter(c -> c.getId() == id).findFirst();
        if (match.isPresent()) {
            return match.get();
        } else {
            throw new NotFoundException(new JsonError("Error", "book " + id + " not found"));
        }
    }

    @POST
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public Response addBook(Book book) {
        MockBookList.addBook(book);
        return Response.status(201).entity(book).build();
    }

    @PUT
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateBook(@Valid Book book, @PathParam("id") long id) {
        int matchIdx;
        if (book.getId() != id) {
            throw new NotFoundException(new JsonError("Error", "Request id is not equal book.id"));
        }
        Optional<Book> match = cList.stream().filter(c -> c.getId() == id).findFirst();
        if (match.isPresent()) {
            matchIdx = cList.indexOf(match.get());
            cList.set(matchIdx, book);
            return Response.status(204).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

    @DELETE
    @Path("{id}")
    public Response deleteBook(@PathParam("id") long id) {
        Predicate<Book> book = b -> b.getId() == id;
        if (cList.removeIf(book)) {
            return Response.status(204).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

}
