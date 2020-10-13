import { Body, Controller, Post } from '@nestjs/common';
import { CreateProducerDto } from './dto/create-producer.dto';
import { ReturnProducerDto } from './dto/return-producer.dto';
import { ProducersService } from './producers.service';

@Controller('producers')
export class ProducersController {
    constructor(private producerService: ProducersService) {}

    @Post()
    async createProduct(
        @Body() createProducerDto: CreateProducerDto,
    ): Promise<ReturnProducerDto> {
        const producer = await this.producerService.createProduct(createProducerDto);
        return {
            producer,
            message: 'Fabricante cadastrado com sucesso!',
        };
    }
}


