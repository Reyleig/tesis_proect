import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSwimmerDto } from './dto/create-swimmer.dto';
import { UpdateSwimmerDto } from './dto/update-swimmer.dto';
import { Swimmer } from './entities/swimmer.entity';

@Injectable()
export class SwimmersService {

  constructor(
    @InjectRepository(Swimmer)
    private swimmersRepository: Repository<Swimmer>,
  ) {}

  create(createSwimmerDto: CreateSwimmerDto) {
    return 'This action adds a new swimmer';
  }

  findAll(): Promise<Swimmer[]> {
    console.log("entro");
    
    return this.swimmersRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} swimmer`;
  }

  update(id: number, updateSwimmerDto: UpdateSwimmerDto) {
    return `This action updates a #${id} swimmer`;
  }

  remove(id: number) {
    return `This action removes a #${id} swimmer`;
  }
}
