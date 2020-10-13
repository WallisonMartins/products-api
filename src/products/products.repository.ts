import { EntityRepository, Repository } from 'typeorm';
import { Product } from './products.entity';
import { CreateProductDto } from './dto/create-product.dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        const { name, price, stock, producer } = createProductDto;

        const product = this.create();
        product.name = name;
        product.price = price;
        product.stock = stock;
        product.producer = producer;

        await product.save();
        return product;
    }
}
