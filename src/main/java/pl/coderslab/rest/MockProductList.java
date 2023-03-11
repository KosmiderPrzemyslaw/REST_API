package pl.coderslab.rest;

import java.math.BigDecimal;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicInteger;

public class MockProductList {
    private static final CopyOnWriteArrayList<Product> productList = new CopyOnWriteArrayList<>();

    private static final AtomicInteger counter = new AtomicInteger(1);

    static {
        productList.add(
                new Product.ProductBuilder().id(counter.getAndIncrement())
                        .name("Buty")
                        .quantity(3)
                        .price(BigDecimal.valueOf(23.60))
                        .description("Opis buta")
                        .build()
        );

        productList.add(
                new Product.ProductBuilder().id(counter.getAndIncrement())
                        .name("Spodnie")
                        .quantity(7)
                        .price(BigDecimal.valueOf(55.32))
                        .description("Opis spodni")
                        .build()
        );

        productList.add(
                new Product.ProductBuilder().id(counter.getAndIncrement())
                        .name("T-Shirt")
                        .quantity(10)
                        .price(BigDecimal.valueOf(49.99))
                        .description("Opis T shirt")
                        .build()
        );
    }

    public static void addProduct(Product product) {
        product.setId(counter.getAndIncrement());
        productList.add(product);
    }

    public MockProductList() {
    }

    public static CopyOnWriteArrayList<Product> getInstance() {
        return productList;
    }
}
