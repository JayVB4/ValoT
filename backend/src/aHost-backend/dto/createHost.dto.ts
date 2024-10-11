import { IsString, IsEmail, IsBoolean, IsOptional } from 'class-validator';

export class CreateHostDto {
  [x: string]: any;
  @IsString()
  name: string; // Required: Admin's name

  @IsEmail()
  email: string; // Required: Admin's email

  @IsString()
  password: string; // Required: Admin's password

  @IsBoolean()
  @IsOptional() // Optional: Status can be omitted, defaults to true
  status?: boolean;
}
