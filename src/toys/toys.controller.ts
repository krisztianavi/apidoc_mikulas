import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { Response } from 'express';
import { ToysService } from './toys.service';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';

@Controller('toys')
export class ToysController {
  constructor(private readonly toysService: ToysService) {}

  @Post()
  create(@Body() createToyDto: CreateToyDto) {
    return this.toysService.create(createToyDto);
  }

  @Get()
  findAll() {
    return this.toysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toysService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateToyDto: UpdateToyDto, @Res() res: Response) {
    try {
      const updatedToy = await this.toysService.update(+id, updateToyDto);
      return res.status(HttpStatus.OK).json({ message: 'Játék frissítve!', updatedToy });
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: `Hiba történt a játék frissítése során: ${error.message}` });
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toysService.remove(+id);
  }
}
