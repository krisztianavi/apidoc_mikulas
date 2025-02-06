import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { ToysService } from './toys.service';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';

@ApiTags('Toys')
@Controller('toys')
export class ToysController {
  constructor(private readonly toysService: ToysService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new toy' })
  @ApiResponse({ status: 201, description: 'Toy created successfully' })
  create(@Body() createToyDto: CreateToyDto) {
    return this.toysService.create(createToyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all toys' })
  @ApiResponse({ status: 200, description: 'Returns all toys' })
  findAll() {
    return this.toysService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a toy by ID' })
  @ApiParam({ name: 'id', example: 1, description: 'ID of the toy' })
  @ApiResponse({ status: 200, description: 'Returns the requested toy' })
  @ApiResponse({ status: 404, description: 'Toy not found' })
  findOne(@Param('id') id: string) {
    return this.toysService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a toy by ID' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'ID of the toy to update'
  })
  @ApiResponse({ status: 200, description: 'Toy updated successfully' })
  @ApiBadRequestResponse({ description: 'Invalid data supplied' })
  async update(@Param('id') id: string, @Body() updateToyDto: UpdateToyDto, @Res() res: Response) {
    try {
      const updatedToy = await this.toysService.update(+id, updateToyDto);
      return res.status(HttpStatus.OK).json({ message: 'Játék frissítve!', updatedToy });
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: `Hiba történt a játék frissítése során: ${error.message}` });
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a toy by ID' })
  @ApiParam({ name: 'id', example: 1, description: 'ID of the toy to delete' })
  @ApiResponse({ status: 200, description: 'Toy deleted successfully' })
  @ApiResponse({ status: 404, description: 'Toy not found' })
  remove(@Param('id') id: string) {
    return this.toysService.remove(+id);
  }
}
