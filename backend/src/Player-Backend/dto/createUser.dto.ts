// src/dto/createUser.dto.ts
import { IsString, IsEmail, IsInt, IsOptional, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string; // Required: User's username

  @IsEmail()
  email: string; // Required: User's email

  @IsString()
  password: string; // Required: User's password

  @IsOptional()
  @IsInt()
  phone_no: number; // Required: User's phone number

  @IsOptional()
  @IsString()
  discord: string; // Required: User's Discord ID

  @IsBoolean()
  @IsOptional()
  status?: boolean; // Optional: User's status

  @IsInt()
  @IsOptional()
  team_id: number; // Required: User's team ID (assuming you have team management)
}

export class UpdateUserDto {
  username?: string; // Required: User's username
  email?: string; // Required: User's email
  password?: string; // Required: User's password
  phone_no?: number; // Required: User's phone number
  discord?: string; // Required: User's Discord ID
  status?: boolean; // Optional: User's status
  team_id?: number; // Required: User's team ID (assuming you have team management)
}