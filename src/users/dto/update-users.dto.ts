import { IsString, IsOptional } from 'class-validator';
export class UpdateUserDto {
    @IsOptional()
    @IsString({
        message: 'Informe um nome de usuário válido',
    })
    username: string;

    @IsOptional()
    status: boolean;
}
