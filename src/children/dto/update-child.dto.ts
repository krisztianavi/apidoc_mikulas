import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from "@nestjs/swagger";
import { CreateChildDto } from './create-child.dto';

export class UpdateChildDto extends PartialType(CreateChildDto) {
@ApiPropertyOptional({
    example: 'John Pork',
    description: 'The full name of the child'
  })
  name?: string;

  @ApiPropertyOptional({
    example: 'Hungary1157 Zsokavar Utca',
    description: 'The address of the child'
  })
  address?: string;

  @ApiPropertyOptional({
    example: false,
    description: 'The good (true) or bad (false) status of the child for Santa'
  })
  gob?: boolean;
}