import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNumber, IsString, Min } from "class-validator";

const materials = ['Wood', 'Metal', 'Plastic', 'Other', 'Wooden'];

/**
 * The data required to add a new toy
 */
export class CreateToyDto {
  /**
   * The name of the toy
   */
  @IsString()
  @ApiProperty({
    example: 'Frisbee',
    description: 'The name of the toy'
  })
  title: string;

  /**
   * The material of the toy
   */
  @IsString()
  @IsIn(materials)
  @ApiProperty({
    enum: materials,
    example: 'Plastic',
    description: 'The material of the toy'
  })
  material: string;

  /**
   * The weight of the toy in grams
   */
  @IsNumber()
  @Min(0)
  @ApiProperty({
    example: 500,
    description: 'The weight of the toy in grams'
  })
  weight: number;
}
