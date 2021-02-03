package pl.coderslab.rest;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class BookExceptionMapper implements ExceptionMapper<javax.validation.ValidationException> {

	@Override
	public Response toResponse(javax.validation.ValidationException e) {
		final StringBuilder strBuilder = new StringBuilder();
		for (ConstraintViolation<?> cv : ((ConstraintViolationException) e).getConstraintViolations()) {
			strBuilder.append(cv.getPropertyPath().toString() + " " + cv.getMessage());
		}
		return Response.status(Response.Status.BAD_REQUEST).entity(new JsonError("Validation", strBuilder.toString())).type(MediaType.APPLICATION_JSON).build();

	}
}