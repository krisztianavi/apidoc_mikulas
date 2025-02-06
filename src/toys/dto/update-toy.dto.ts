import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateToyDto } from './create-toy.dto';

const materials = ['Wood', 'Metal', 'Plastic', 'Other', 'Wooden'];

export class UpdateToyDto extends PartialType(CreateToyDto) {
    @ApiPropertyOptional({
        example: 'Frisbee',
        description: 'The name of the toy'
    })
    title?: string;

    @ApiPropertyOptional({
        enum: materials,
        example: 'Plastic',
        description: 'The material of the toy'
    })
    material?: string;

    @ApiPropertyOptional({
        example: 500,
        description: 'The weight of the toy in grams'
    })
    weight?: number;
}
