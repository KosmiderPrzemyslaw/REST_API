package pl.coderslab.rest;

import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class MockBookList {
  private static final CopyOnWriteArrayList<Book> cList = new CopyOnWriteArrayList<>();

  private static final AtomicInteger counter = new AtomicInteger(1);

  static {
    // Create list of customers
    cList.add(
        new Book.BookBuilder().id(counter.getAndIncrement())
        .title("Thiniking in Java")
        .isbn("9788324631766")
        .author("Bruce Eckel")
        .publisher("Helion")
        .type("programming")
        .build()
    );
    cList.add(
        new Book.BookBuilder().id(counter.getAndIncrement())
        .title("Rusz glowa Java.")
        .isbn("9788324627738")
        .author("Sierra Kathy, Bates Bert")
        .publisher("Helion")
        .type("programming")
        .build()
    );
    cList.add(
        new Book.BookBuilder().id(counter.getAndIncrement())
        .title("Java 2. Podstawy")
        .isbn("9780130819338")
        .author("Cay Horstmann, Gary Cornell")
        .publisher("Helion")
        .type("programming")
        .build()
    );

  }
  public static void addBook(Book book){
    book.setId(counter.getAndIncrement());
    cList.add(book);
  }
  
  private MockBookList(){}
  
  public static CopyOnWriteArrayList<Book> getInstance(){
    return cList;
  }
  
}
