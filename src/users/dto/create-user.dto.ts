import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({
        message: 'Informe o nome do usuário',
    })
    @MaxLength(200, {
        message: 'O nome deve ter menos de 200 caracteres',
    })
    username: string;

    @IsNotEmpty({
        message: 'Informe uma senha',
    })
    @MinLength(6, {
        message: 'A senha deve ter no mínimo 6 caracteres',
    })
    password: string;

    @IsNotEmpty({
        message: 'Informe a confirmação de senha',
    })
    @MinLength(6, {
        message: 'A confirmação de senha deve ter no mínimo 6 caracteres',
    })
    passwordConfirmation: string;
}
