import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProducerDto } from './dto/create-producer.dto';
import { Producer } from './producers.entity';
import { ProducerRepository } from './producers.repository';


@Injectable()
export class ProducersService {
    constructor(
        @InjectRepository(ProducerRepository)
        private producerRepository: ProducerRepository,
    ) {}

    async createProduct(createProducerDto: CreateProducerDto): Promise<Producer> {
        return this.producerRepository.createProduct(createProducerDto);
    }
}
