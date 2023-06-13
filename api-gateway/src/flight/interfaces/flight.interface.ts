import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export interface IFlight extends Document {
  readonly pilot: string;
  readonly airplane: string;
  readonly destination: string;
  readonly flightDate: Date;
}
