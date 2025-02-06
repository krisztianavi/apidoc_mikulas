import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { ChildrenService } from './children.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';

@ApiTags('Children')
@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new child' })
  @ApiResponse({ status: 201, description: 'Child created successfully' })
  create(@Body() createChildDto: CreateChildDto) {
    return this.childrenService.create(createChildDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all children' })
  @ApiResponse({ status: 200, description: 'Returns all children' })
  findAll() {
    return this.childrenService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a child by ID' })
  @ApiParam({ name: 'id', example: 1, description: 'ID of the child' })
  @ApiResponse({ status: 200, description: 'Returns the requested child' })
  @ApiResponse({ status: 404, description: 'Child not found' })
  findOne(@Param('id') id: string) {
    return this.childrenService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a child by ID' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'ID of the child to update'
  })
  @ApiResponse({ status: 200, description: 'Child updated successfully' })
  @ApiBadRequestResponse({ description: 'Invalid data supplied' })
  update(@Param('id') id: string, @Body() updateChildDto: UpdateChildDto) {
    return this.childrenService.update(+id, updateChildDto);
  }

  @Delete(':childId/toys/:toyId')
  @ApiOperation({ summary: 'Remove a toy from a child' })
  @ApiParam({ name: 'childId', example: 1, description: 'ID of the child' })
  @ApiParam({ name: 'toyId', example: 10, description: 'ID of the toy to remove' })
  @ApiResponse({ status: 200, description: 'Toy removed successfully' })
  @ApiResponse({ status: 404, description: 'Child or toy not found' })
  removeChildToy(@Param('childId') childId: number, @Param('toyId') toyId: number) {
    return this.childrenService.removeChildToy(+childId, +toyId);
  }
}
