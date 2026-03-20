import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProduitDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'Au plus 100 caracteres' })
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  priceHT: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  stock?: number;
}
