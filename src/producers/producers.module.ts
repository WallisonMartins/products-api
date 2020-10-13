import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducerRepository } from './producers.repository';
import { ProducersService } from './producers.service';
import { ProducersController } from './producers.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ProducerRepository])],
    providers: [ProducersService],
    controllers: [ProducersController],
})
export class ProducersModule {}
