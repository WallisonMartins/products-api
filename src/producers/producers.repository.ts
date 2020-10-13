import { EntityRepository, Repository } from 'typeorm';
import { Producer } from './producers.entity';
import { CreateProducerDto } from './dto/create-producer.dto';

@EntityRepository(Producer)
export class ProducerRepository extends Repository<Producer> {
    async createProduct(createProducerDto: CreateProducerDto): Promise<Producer> {
        const { name } = createProducerDto;

        const producer = this.create();
        producer.name = name;

        await producer.save();
        return producer;
    }
}