import {
    Controller,
    Post,
    Body,
    ValidationPipe,
    Get,
    Param,
    Patch,
    Delete,
    Query,
} from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUsersQueryDto } from './dto/find-users-query.dto';
import { ReturnUserDto } from './dto/return-user.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    async createUser(
        @Body(ValidationPipe) createUserDto: CreateUserDto,
    ): Promise<ReturnUserDto> {
        const user = await this.usersService.createUser(createUserDto);

        return {
            user,
            message: 'Usuário cadastrado com sucesso!',
        };
    }

    @Get()
    async findAllUsers(): Promise<ReturnUserDto> {
        const user = await this.usersService.findAllUsers();
        return {
            user,
            message: 'Listagem de todos os usuários encontrados',
        };
    }

    @Get(':id')
    async findUserById(@Param('id') id): Promise<ReturnUserDto> {
        const user = await this.usersService.findUserById(id);
        return {
            user,
            message: 'Usuário encontrado',
        };
    }

    @Patch(':id')
    async updateUser(
        @Body(ValidationPipe) updateUserDto: UpdateUserDto,
        @GetUser() user: User,
        @Param('id') id: string,
    ) {
        return this.usersService.updateUser(updateUserDto, id);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        await this.usersService.deleteUser(id);
        return {
            message: 'Usuário removido com sucesso',
        };
    }

    @Get()
    async findUsers(@Query() query: FindUsersQueryDto) {
        const found = await this.usersService.findUsers(query);
        return {
            found,
            message: 'Usuários encontrados',
        };
    }
}
