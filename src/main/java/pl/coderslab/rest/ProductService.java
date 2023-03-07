package pl.coderslab.rest;

import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;
import java.awt.*;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;

@Path("/products")
public class ProductService {
    private final List<Product> productList = MockProductList.getInstance();

    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Product> getAllProducts() {
        return productList;
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Product getProduct(@PathParam("id") long id) {
        Optional<Product> match = productList.stream().filter(c -> c.getId() == id).findFirst();
        if (match.isPresent()) {
            return match.get();
        } else {
            throw new NotFoundException(new JsonError("Error", "book " + id + " not found"));
        }
    }

    @POST
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public Response addProduct(Product product) {
        MockProductList.addProduct(product);
        return Response.status(201).entity(product).build();
    }

    @PUT
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateProduct(@Valid Product product, @PathParam("id") long id) {
        int matchIdx;
        if(product.getId() != id){
            throw new NotFoundException(new JsonError("Error", "Requested id is not equal product.id"));
        }

        Optional<Product> match = productList.stream().filter(c -> c.getId() == id).findFirst();

        if (match.isPresent()) {
            matchIdx = productList.indexOf(match.get());
            productList.set(matchIdx, product);
            return Response.status(204).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

    @DELETE
    @Path("{id}")
    public Response deleteProduct(@PathParam("id") long id){
        Predicate<Product> product = p -> p.getId() == id;
        if(productList.removeIf(product)){
            return Response.status(204).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
}
