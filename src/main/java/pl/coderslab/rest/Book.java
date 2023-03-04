
package pl.coderslab.rest;

import java.util.concurrent.atomic.AtomicLong;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

public class Book {
  private long id;
  private final String isbn;
  @NotNull()
  @Length(min = 2)
  private final String title;
  private final String author;
  private final String publisher;
  private final String type;


  private Book(BookBuilder builder){
    this.id = builder.id;
    this.isbn = builder.isbn;
    this.title = builder.title;
    this.author = builder.author;
    this.publisher = builder.publisher;
    this.type = builder.type;

  }
  
  public Book(){
    Book book = new Book.BookBuilder().build();
      this.id = book.getId();
      this.isbn = book.getIsbn();
      this.title = book.getTitle();
      this.author = book.getAuthor();
      this.publisher = book.getPublisher();
      this.type = book.getType();
  }


  
  public long getId(){
    return this.id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getIsbn() {
    return this.isbn;
  }

  public String getTitle() {
    return this.title;
  }
  
  public String getAuthor(){
    return this.author;
  }

  public String getPublisher() {
    return this.publisher;
  }

  public String getType() {
    return this.type;
  } 

  
  @Override
  public String toString(){
    return "ID: " + id 
        + " First: " + isbn
        + " Last: " + title + "\n"
        + "author: " + author + "\n"
        + "publisher: " + publisher
        + " type: " + type;
  }  
  
  public static class BookBuilder{
    private long id;
    private String isbn = "";
    private String title = "";
    private String author = "";
    private String publisher = "";
    private String type = "";
    
    public BookBuilder id(int id){
      this.id = id;
      return this;
    }
    
    public BookBuilder isbn(String isbn){
      this.isbn = isbn;
      return this;
    }

    public BookBuilder title(String title){
      this.title = title;
      return this;
    }
    
    public BookBuilder author(String author){
      this.author = author;
      return this;
    }
    
    public BookBuilder publisher(String publisher){
      this.publisher = publisher;
      return this;
    }
    
    public BookBuilder type(String type){
      this.type = type;
      return this;
    }

    public Book build(){
      return new Book(this);
    }
    
  }    
}
