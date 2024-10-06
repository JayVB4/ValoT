import { IsString, IsEmail, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string; // Required: User's name

  @IsEmail()
  email: string; // Required: User's email

  @IsString()
  password: string; // Required: User's password

  @IsBoolean()
  @IsOptional() // Optional: Status can be omitted, defaults to true
  status?: boolean; 
}
