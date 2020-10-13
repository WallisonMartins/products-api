import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ReturnProductDto } from './dto/return-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService) {}

    @Post()
    async createProduct(
        @Body() createProductDto: CreateProductDto,
    ): Promise<ReturnProductDto> {
        const product = await this.productService.createProduct(createProductDto);
        return {
            product,
            message: 'Produto cadastrado com sucesso!',
        };
    }
}
