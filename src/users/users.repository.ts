import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CredentialsDto } from '../auth/dto/credentials.dto';
import * as bcrypt from 'bcrypt';
import {
    ConflictException,
    InternalServerErrorException,
} from '@nestjs/common';
import { FindUsersQueryDto } from './dto/find-users-query.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async findUsers(
        queryDto: FindUsersQueryDto,
    ): Promise<{ users: User[]; total: number }> {
        queryDto.status =
            queryDto.status === undefined ? true : queryDto.status;
        queryDto.page = queryDto.page < 1 ? 1 : queryDto.page;
        queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;

        const { username, status } = queryDto;
        const query = this.createQueryBuilder('user');
        query.where('user.status = :status', { status });

        if (username) {
            query.andWhere('user.username ILIKE :username', { username: `%${username}%` });
        }
    
        query.skip((queryDto.page - 1) * queryDto.limit);
        query.take(+queryDto.limit);
        query.orderBy(queryDto.sort ? JSON.parse(queryDto.sort) : undefined);
        query.select(['user.username', 'user.status']);

        const [users, total] = await query.getManyAndCount();

        return { users, total };
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { username, password } = createUserDto;

        const user = this.create();
        user.username = username;
        user.status = true;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        try {
            await user.save();
            delete user.password;
            delete user.salt;
            return user;
        } catch (error) {
            if (error.code.toString() === '23505') {
                throw new ConflictException(
                    'este nome de usuário já está em uso',
                );
            } else {
                throw new InternalServerErrorException(
                    'Erro ao salvar o usuário no banco de dados',
                );
            }
        }
    }

    async checkCredentials(credentialsDto: CredentialsDto): Promise<User> {
        const { username, password } = credentialsDto;
        const user = await this.findOne({ username, status: true });

        if (user && (await user.checkPassword(password))) {
            return user;
        } else {
            return null;
        }
    }

    private async hashPassword(
        password: string,
        salt: string,
    ): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}
