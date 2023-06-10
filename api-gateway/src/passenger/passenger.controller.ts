import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { ClientProxySuperFlights } from '../common/proxy/client-proxy';
import { Observable } from 'rxjs';
import { IPassenger } from './interfaces/passenger.interface';
import { PassengerMSG } from '../common/constants';

@Controller('passenger')
export class PassengerController {
  constructor(private readonly clientProxy: ClientProxySuperFlights) {}

  private clientProxyPassengers = this.clientProxy.ClientProxyPassengers();

  @Post()
  create(
    @Body() createPassengerDto: CreatePassengerDto,
  ): Observable<IPassenger> {
    return this.clientProxyPassengers.send(
      PassengerMSG.CREATE,
      createPassengerDto,
    );
  }

  @Get()
  findAll(): Observable<IPassenger[]> {
    return this.clientProxyPassengers.send(PassengerMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IPassenger> {
    return this.clientProxyPassengers.send(PassengerMSG.FIND_ONE, id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePassengerDto: UpdatePassengerDto,
  ): Observable<IPassenger> {
    return this.clientProxyPassengers.send(PassengerMSG.UPDATE, {
      id,
      updatePassengerDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientProxyPassengers.send(PassengerMSG.DELETE, id);
  }
}
