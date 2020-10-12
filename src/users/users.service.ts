import {
    Injectable,
    UnprocessableEntityException,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUsersQueryDto } from './dto/find-users-query.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { User } from './user.entity';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        if (createUserDto.password != createUserDto.passwordConfirmation) {
            throw new UnprocessableEntityException('As senhas não conferem');
        } else {
            return this.userRepository.createUser(createUserDto);
        }
    }

    async findAllUsers(): Promise<any> {
        const users = await this.userRepository.find()
        return users;
    }

    async findUserById(userId: string): Promise<User> {
        const user = await this.userRepository.findOne(userId, {
            select: ['username', 'id'],
        });

        if (!user) throw new NotFoundException('Usuário não encontrado');

        return user;
    }

    async updateUser(updateUserDto: UpdateUserDto, id: string): Promise<User> {
        const user = await this.findUserById(id);
        const { username, status } = updateUserDto;
        user.username = username ? username : user.username;
        user.status = status === undefined ? user.status : status;
        try {
            await user.save();
            return user;
        } catch (error) {
            throw new InternalServerErrorException(
                'Erro ao salvar os dados no banco de dados',
            );
        }
    }

    async deleteUser(userId: string) {
        const result = await this.userRepository.delete({ id: userId });
        if (result.affected === 0) {
            throw new NotFoundException(
                'Não foi encontrado um usuário com o ID informado',
            );
        }
    }

    async findUsers(
        queryDto: FindUsersQueryDto,
    ): Promise<{ users: User[]; total: number }> {
        const users = await this.userRepository.findUsers(queryDto);
        return users;
    }
}
