import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../user/dto/create-user.dto';
import { LocalAuthGuard } from './guards';
import { Observable } from 'rxjs';
import { IUser } from '../user/interfaces/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Req() req) {
    try {
      return this.authService.signIn(req.user);
    } catch (e) {
      console.log(e);
    }
  }

  @Post('signup')
  signUn(@Body() userDto: UserDto): Observable<IUser> {
    return this.authService.signUp(userDto);
  }
}
