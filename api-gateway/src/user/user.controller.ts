import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxySuperFlights } from '../common/proxy/client-proxy';
import { Observable } from 'rxjs';
import { IUser } from './interfaces/user.interface';
import { UserMSG } from '../common/constants';

@Controller('user')
export class UserController {
  constructor(private readonly clientProxy: ClientProxySuperFlights) {}

  private clientProxyUser = this.clientProxy.ClientProxyUsers();

  @Post()
  create(@Body() createUserDto: CreateUserDto): Observable<IUser> {
    return this.clientProxyUser.send(UserMSG.CREATE, createUserDto);
  }

  @Get()
  findAll(): Observable<IUser[]> {
    return this.clientProxyUser.send(UserMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IUser> {
    return this.clientProxyUser.send(UserMSG.FIND_ONE, id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Observable<IUser> {
    return this.clientProxyUser.send(UserMSG.UPDATE, { id, updateUserDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientProxyUser.send(UserMSG.DELETE, id);
  }
}
