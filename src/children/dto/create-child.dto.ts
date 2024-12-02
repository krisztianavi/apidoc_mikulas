import { IsString, IsNotEmpty, IsBoolean } from "class-validator"

export class CreateChildDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  address: string

  @IsBoolean()
  @IsNotEmpty()
  gob: boolean
}
