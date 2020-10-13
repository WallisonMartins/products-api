import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ProducersModule } from './producers/producers.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        UsersModule,
        AuthModule,
        ProductsModule,
        ProducersModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
