import { IsIn, IsNumber, IsString, Min } from "class-validator"

const materials = ['Wood', 'Metal', 'Plastic', 'Other', 'Wooden'];


export class CreateToyDto {
  @IsString()
  title: string

  @IsString()
  @IsIn(materials)
  material: string

  @IsNumber()
  @Min(0)
  weight: number
}
