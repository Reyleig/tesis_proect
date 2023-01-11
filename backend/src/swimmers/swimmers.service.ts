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

  async create(createSwimmerDto: CreateSwimmerDto) {
    console.log("entro", createSwimmerDto);
    
    console.log(await this.swimmersRepository.save(createSwimmerDto));
    
    return null;
  }

  findAll(): Promise<Swimmer[]> {
    console.log("entro");
    
    // eslint-disable-next-line prettier/prettier
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
