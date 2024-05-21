import { IsString, Length } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @Length(10, 500)
  bio?: string;

  @IsString()
  profileImage?: string;
}
