import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateHostDto {
  @IsString()
  username: string; // Required: Host's username

  @IsEmail()
  email: string; // Required: Host's email

  @IsString()
  pass: string; // Required: Host's password

  @IsOptional() // Optional: Host's role can be omitted, defaults to HOST
  role?: string;
}
