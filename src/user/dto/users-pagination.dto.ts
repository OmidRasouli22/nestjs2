import { IsNumber, IsPositive } from 'class-validator';

export class UserPaginationDto {
  @IsNumber()
  @IsPositive()
  page: number;

  @IsNumber()
  @IsPositive()
  limit: number;
}
