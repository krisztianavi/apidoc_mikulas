import { Injectable } from '@nestjs/common';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChildrenService {

  constructor(private readonly prismaService: PrismaService) {}

  create(createChildDto: CreateChildDto) {
    return this.prismaService.child.create({
      data: createChildDto
    })
  }

  findAll() {
    return this.prismaService.child.findMany();
  }

  findOne(id: number) {
    return this.prismaService.child.findUnique({
      where: { id },
    });
  }

  update(id: number, updateChildDto: UpdateChildDto) {
    return this.prismaService.child.update({
      where: { id },
      data: updateChildDto,
    });
  }

  remove(id: number) {
    return this.prismaService.child.delete({
      where: { id },
    });
  }
}
