import { BaseQueryParametersDto } from '../../shared/dto/base-query-parameters.dto';

export class FindUsersQueryDto extends BaseQueryParametersDto {
    username: string;
    status: boolean;
}
