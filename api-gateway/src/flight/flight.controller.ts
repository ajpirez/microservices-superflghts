import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { ClientProxySuperFlights } from '../common/proxy/client-proxy';
import { Observable } from 'rxjs';
import { IFlight } from './interfaces/flight.interface';
import { FlightMSG, PassengerMSG } from '../common/constants';

@Controller('flight')
export class FlightController {
  constructor(private readonly clientProxy: ClientProxySuperFlights) {}

  private clientProxyFlight = this.clientProxy.ClientProxyFlights();
  private clientProxyPassenger = this.clientProxy.ClientProxyPassengers();

  @Post()
  create(@Body() createFlightDto: CreateFlightDto): Observable<IFlight> {
    return this.clientProxyFlight.send(FlightMSG.CREATE, createFlightDto);
  }

  @Get()
  findAll(): Observable<IFlight[]> {
    return this.clientProxyFlight.send(FlightMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IFlight> {
    return this.clientProxyFlight.send(FlightMSG.FIND_ONE, id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFlightDto: UpdateFlightDto,
  ): Observable<IFlight> {
    return this.clientProxyFlight.send(FlightMSG.UPDATE, {
      id,
      updateFlightDto,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this.clientProxyFlight.send(FlightMSG.DELETE, id);
  }

  @Post(':flightId/passenger/:passengerId')
  async addPassenger(
    @Param('flightId') flightId: string,
    @Param('passengerId') passengerId: string,
  ) {
    const passenger = await this.clientProxyPassenger.send(
      PassengerMSG.FIND_ONE,
      passengerId,
    );

    if (!passenger)
      throw new HttpException('Passenger Not Found', HttpStatus.NOT_FOUND);

    return this.clientProxyFlight.send(FlightMSG.ADD_PASSENGER, {
      flightId,
      passengerId,
    });
  }
}
