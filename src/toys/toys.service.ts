import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ToysService {

  constructor(private readonly prismaService: PrismaService) { }

  create(createToyDto: CreateToyDto) {
    return this.prismaService.toy.create({
      data: createToyDto,
    });
  }

  findAll() {
    return this.prismaService.toy.findMany();
  }

  async findOne(id: number) {
    const toy = await this.prismaService.toy.findUnique({
      where: { id },
    });
    if (!toy) {
      throw new NotFoundException(`Játék nem található ezzel az id-val: ${id}`);
    }    
    return toy;
  }


  async update(id: number, updateToyDto: UpdateToyDto) {
    const toy = await this.prismaService.toy.findUnique({
      where: { id },
    });

    if (!toy) {
      throw new NotFoundException(`Játék nem található ezzel az id-val: ${id}`);
    }
    return this.prismaService.toy.update({
      where: { id },
      data: updateToyDto,
    });
  }

  async remove(id: number) {
    try {
      const deletedToy = await this.prismaService.toy.delete({
        where: { id },
      });
      return { message: `A játék törlődött.`, deletedToy };
    } catch (error) {
      if (error.code === 'P2025') {
        return { message: `A játék nem található.` };
      }
    }
  }

}
