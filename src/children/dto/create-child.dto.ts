import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsBoolean } from "class-validator";

/**
 * The data required to add a new child
 */
export class CreateChildDto {
  /**
   * The name of the child
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'John Pork',
    description: 'The full name of the child'
  })
  name: string;

  /**
   * The address of the child
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Hungary1157 Zsokavar Utca',
    description: 'The address of the child'
  })
  address: string;

  /**
   * Indicates whether the child has been good or bad this year
   */
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example: false,
    description: 'The good (true) or bad (false) status of the child for Santa'
  })
  gob: boolean;
}
