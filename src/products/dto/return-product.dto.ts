import { Product } from '../products.entity';

export class ReturnProductDto {
    product: Product;
    message: string;
}