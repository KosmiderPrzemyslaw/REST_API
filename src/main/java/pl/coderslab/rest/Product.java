package pl.coderslab.rest;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

public class Product {
    private long id;
    @NotNull()
    @Length(min = 3)
    private final String name;
    private final int quantity;
    private final BigDecimal price;


    private Product(ProductBuilder builder) {
        this.id = builder.id;
        this.name = builder.name;
        this.quantity = builder.quantity;
        this.price = builder.price;
    }

    public Product() {
        Product product = new Product.ProductBuilder().build();
        this.id = product.getId();
        this.name = product.getName();
        this.quantity = product.getQuantity();
        this.price = product.getPrice();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public int getQuantity() {
        return quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public static class ProductBuilder {
        private long id;
        private String name = "";
        private int quantity = 0;
        private BigDecimal price = BigDecimal.valueOf(0);

        public ProductBuilder id(long id) {
            this.id = id;
            return this;
        }

        public ProductBuilder name(String name) {
            this.name = name;
            return this;
        }

        public ProductBuilder quantity(int quantity) {
            this.quantity = quantity;
            return this;
        }

        public ProductBuilder price(BigDecimal price) {
            this.price = price;
            return this;
        }

        public Product build() {
            return new Product(this);
        }
    }
}


