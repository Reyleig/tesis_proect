import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UtilityService } from '../general/utility.service';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private utilityService: UtilityService,

  ){}

  async findAll() {
    let response = await this.categoryRepository.find();
    return await this.utilityService.serviceResponse(HttpStatus.OK, response);
  }


}
