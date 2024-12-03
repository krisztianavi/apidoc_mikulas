import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChildrenService {

  constructor(private readonly prismaService: PrismaService) { }

  create(createChildDto: CreateChildDto) {
    return this.prismaService.child.create({
      data: createChildDto
    })
  }

  findAll() {
    return this.prismaService.child.findMany();
  }

  async findOne(id: number) {
    const child = await this.prismaService.child.findUnique({
      where: { id },
    });
    if (!child) {
      throw new NotFoundException(`Gyermek nem található ezzel az id-val: ${id}`);
    }
    return child;
  }

  update(id: number, updateChildDto: UpdateChildDto) {
    return this.prismaService.child.update({
      where: { id },
      data: updateChildDto,
    });
  }

  async remove(id: number) {
    try {
      const deletedChild = await this.prismaService.child.delete({
        where: { id },
      });
      return { message: `A gyermek törlődött.`, deletedChild };
    } catch (error) {
      if (error.code === 'P2025') {
        return { message: `A gyermek nem található.` };
      }
    }
  }


  async removeChildToy(childId: number, toyId: number) {
    try {
      return await this.prismaService.childrenAndToys.delete({
        where: {
          toyId_childId: { toyId, childId },
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Az adott játék a gyermeknél nem találha.');
      }
      throw error;
    }
  }
} 
