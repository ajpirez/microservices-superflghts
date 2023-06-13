import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/dto/create-user.dto';
import { ClientProxySuperFlights } from '../common/proxy/client-proxy';
import { UserMSG } from '../common/constants';
import { firstValueFrom, Observable } from 'rxjs';
import { IUser } from '../user/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientProxy: ClientProxySuperFlights,
    private readonly jwtService: JwtService,
  ) {}

  private clientProxyUser = this.clientProxy.ClientProxyUsers();

  async validateUser(username: string, password: string): Promise<any> {
    const user = await firstValueFrom(
      this.clientProxyUser.send(UserMSG.VALID_USER, {
        username,
        password,
      }),
    );
    if (user) return user;

    return null;
  }

  async signIn(user: any) {
    const payload = {
      username: user.username,
      sub: user._id,
    };

    return { ...payload, access_token: this.jwtService.sign(payload) };
  }

  signUp(userDto: UserDto): Observable<IUser> {
    return this.clientProxyUser.send(UserMSG.CREATE, userDto);
  }
}
