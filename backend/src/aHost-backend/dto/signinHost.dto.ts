// export class SigninHostDto {
//   email: string;
//   password: string;
// }
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SigninHostDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
