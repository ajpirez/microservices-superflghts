import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserMSG } from '../common/constants';
import { firstValueFrom, Observable } from 'rxjs';
import { UserDto } from './dto/create-user.dto';
import { ClientProxySuperFlights } from '../common/proxy/client-proxy';
import { IUser } from './interfaces/user.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('users')
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly clientProxy: ClientProxySuperFlights) {}

  private clientProxyUser = this.clientProxy.ClientProxyUsers();

  @Post()
  create(@Body() userDTO: UserDto): Observable<IUser> {
    return this.clientProxyUser.send(UserMSG.CREATE, userDTO);
  }

  @Get()
  findAll(): Observable<IUser[]> {
    return this.clientProxyUser.send(UserMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IUser> {
    return this.clientProxyUser.send(UserMSG.FIND_ONE, id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() userDTO: UserDto) {
    try {
      const user = await firstValueFrom(this.findOne(id));
      console.log(user);
      if (!user)
        throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
      return this.clientProxyUser.send(UserMSG.UPDATE, { id, userDTO });
    } catch (e) {
      console.log(e);
    }
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this.clientProxyUser.send(UserMSG.DELETE, id);
  }
}
