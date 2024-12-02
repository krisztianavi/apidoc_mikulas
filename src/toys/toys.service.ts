import { Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return this.prismaService.toy.findUnique({
      where: { id },
    });
  }

  update(id: number, updateToyDto: UpdateToyDto) {
    return this.prismaService.toy.update({
      where: { id },
      data: updateToyDto,
    });
  }

  remove(id: number) {
    return this.prismaService.toy.delete({
      where: { id },
    });
  }
}
