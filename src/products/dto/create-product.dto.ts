import { Producer } from "src/producers/producers.entity";

export class CreateProductDto {
    name: string;
    price: number;
    stock: number;
    producer: Producer;
}
